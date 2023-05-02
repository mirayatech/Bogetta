import { Player } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion";
import order from "../../public/order.json";

function OrderAnimation() {
  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Preaping your order
      </motion.h1>

      <Player autoplay loop src={order}></Player>
    </div>
  );
}

export default OrderAnimation;
