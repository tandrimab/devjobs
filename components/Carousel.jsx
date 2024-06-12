import Image from "next/image";
import { useEffect, useState } from "react";

export default function Carousel({ items }) {
  const [show, setShow] = useState(0);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStartAnimation(true);
    }, 3600);

    return () => {
      clearTimeout(timeout);
    };
  }, [startAnimation]);

  useEffect(() => {
    let interval;
    if (startAnimation) {
      interval = setInterval(() => {
        setShow((show) => (show + 1) % 3);
      }, 8000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [startAnimation, show]);

  return (
    startAnimation && (
      <div className="flex overflow-hidden max-w-[50%] mr-auto relative items-center justify-start ml-12 animate-scaleImage">
        {items.map((item, index) => (
          <>
            <Image
              className={
                "block flex-grow-0 flex-shrink-0 transition-opacity duration-5000 delay-500 z-40 " +
                (index === show ? "animate-sliderLeft" : "hidden")
              }
              key={item.src}
              src={item.src}
              width={500}
              height={750}
              alt="Images for carousel"
            />
            <p
              className={
                "text-[2rem] absolute text-transparent z-30 transition-all animate-zoomInOutText text-center " +
                (index === show ? "" : "hidden")
              }
            >
              {item.text}
            </p>
          </>
        ))}
      </div>
    )
  );
}
