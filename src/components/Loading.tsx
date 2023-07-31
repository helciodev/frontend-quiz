import { Player } from "@lottiefiles/react-lottie-player";
import loadindElephant from "/loading-lottie-file.json?url";
export default function Loading() {
  return (
    <div className='loader-container'>
      <div className='loader'>
        <Player
          className='w-[350px]  h-[350px]'
          loop
          autoplay
          src={loadindElephant}
        ></Player>
      </div>
    </div>
  );
}
