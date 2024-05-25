import Image from "next/image";
import { useEffect, useState } from "react";

export default function SearchBoxAnimated(props) {
  let searchList = ['"title"', '"companies"', '"expertise"'];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    
    const id = setInterval(() => {
      setIndex((index + 1) % 3);
    }, [1800]);

    return () => clearInterval(id);
  }, [index]);

  return (
    <div className="flex items-center justify-start p-4 rounded-tl-[6px] rounded-bl-[6px] relative">
      <Image
        src="https://devjobs-fs.s3.ap-south-1.amazonaws.com/assets/desktop/icon-search.svg"
        width={24}
        height={24}
        className="my-2 mx-4"
        alt="search"
      />
      <input
        type="text"
        value={props.searchTitle}
        onChange={(e) => props.setSearchTitle(e.target.value)}
        className="outline-none w-full bg-transparent peer z-[999]"
      />

      <div className="peer-focus:hidden flex justify-start absolute w-full left-20">
        <div className="relative">
          <label>Filter by &nbsp;</label>
          {searchList.map((item, idx) => (
            <label
              key={idx.toString()}
              className={
                "absolute " +
                (idx === index
                  ? " left-[4.2rem] top-[-5px] block animate-sliderUp transition ease-in-out delay-100 "
                  : "hidden")
              }
            >
              {item}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
