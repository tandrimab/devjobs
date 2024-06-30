import Image from "next/image";
import { useEffect, useState } from "react";

export default function Carousel({ items, startAnimation }) {
  const [show, setShow] = useState(0);

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
    <div className="flex overflow-hidden mr-auto relative items-center justify-start md:ml-12 sm:mx-auto animate-scaleImage">
      {items.map((item, index) => (
        <>
          <Image
            className={
              "block flex-grow-0 flex-shrink-0 transition-opacity duration-5000 delay-500 z-40 " +
              (index === show ? "animate-sliderLeft" : "hidden")
            }
            key={item.src}
            src={item.src}
            width={750}
            height={1250}
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
  );
}
