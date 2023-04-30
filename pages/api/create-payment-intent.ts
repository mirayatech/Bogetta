import { getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { authOptions } from "./auth/[...nextauth]";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const userSession = await getServerSession(request, response, authOptions);
  // Get user
  if (!userSession?.user) {
    response.status(403).json({ message: "Not logged in" });
    return;
  }
  // Extract the data from the body
  const { items, payment_intent_id } = request.body;

  response.status(200).json({ userSession });
  return;
  // Data necessary for the order
}
