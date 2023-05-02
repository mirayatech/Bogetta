import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

const prisma = new PrismaClient();

export default async function WebhookHandler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const buf = await buffer(request);
  const signature = request.headers["stripe-signature"];

  if (!signature)
    return response.status(400).send("Missing the stripe signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      signature,
      process.env.STRIPE_WEBHOOK_SECERET!
    );
  } catch (error) {
    return response.status(400).send("Webhook errer" + error);
  }

  /// handle different types of events
  switch (event.type) {
    case "payment_intent.created":
      const pymentIntent = event.data.object;
      console.log("Payment intent as created");
      break;
    case "charge.succeeded":
      const charge = event.data.object as Stripe.Charge;
      if (typeof charge.payment_intent === "string") {
        const order = await prisma.order.update({
          where: { paymentIntentID: charge.payment_intent },
          data: { status: "complete" },
        });
      }
      break;
    default:
      console.log("unhandled event type:" + event.type);
  }
  response.json({ recedived: true });
}
