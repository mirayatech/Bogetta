import { Player } from "@lottiefiles/react-lottie-player";
import loading from "../public/loading.json";

export default function OrderAnimation() {
  return (
    <div className="flex flex-col items-center justify-center h-screen m-auto">
      <Player autoplay loop src={loading} />
    </div>
  );
}
