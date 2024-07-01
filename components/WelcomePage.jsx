import Image from "next/image";
import Carousel from "./Carousel";
import LoginButtons from "./LoginButtons";
import { useEffect, useState } from "react";

export default function WelcomePage({ items, bg }) {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStartAnimation(true);
    }, 3800);

    return () => {
      clearTimeout(timeout);
    };
  }, [startAnimation]);

  return (
    <div className="w-full h-[100vh]">
      <div className="h-full w-full absolute" style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1) 100%)",
        }}>
        <Image layout="fill" objectFit="cover" src={bg} alt="background" />
      </div>
      <div
        className="absolute h-full w-full inset-0 backdrop-brightness-50 backdrop-blur-xl flex justify-center items-center flex-col"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1) 100%)",
        }}
      >
        <div className="text-center animate-scaleOutBox">
          <p className="text-[4rem] text-white transition-all animate-zoomText z-1">
            Welcome to
          </p>
          <br />
          <div className="flex flex-col">
            <p className="text-[7rem] mt-2 animate-showText text-transparent font-[1100]">
              devjobs
            </p>
            <div className="animate-underlineText bg-violet transition-all h-2 w-0" />
          </div>
        </div>
        {startAnimation && <div className="flex lg:flex-row sm:flex-col lg:justify-between sm:justify-around items-center w-full md:max-w-[70%] sm:max-w-full sm:h-full">
        <Carousel items={items} startAnimation />
        <LoginButtons  />
        </div>}
      </div>
    </div>
  );
}
