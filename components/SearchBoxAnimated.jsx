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
    <div className="flex items-center justify-start md:p-4 sm:p-0 rounded-tl-[6px] rounded-bl-[6px] relative">
      <Image
        src="https://devjobs-fs.s3.ap-south-1.amazonaws.com/assets/desktop/icon-search.svg"
        width={24}
        height={24}
        className="my-2 md:mx-4 sm:mx-2"
        alt="search"
      />
      <input
      name="position"
        type="text"
        value={props.filters.position}
        onChange={props.handleSearchInput}
        className="outline-none w-full bg-transparent peer z-[999] dark:text-darkGrey dark:focus:text-white"
      />

      <div className="peer-focus:hidden flex justify-start absolute md:left-20 sm:left-10">
        <div className="relative">
          <label className="dark:text-darkGrey">Filter by &nbsp;</label>
          {searchList.map((item, idx) => (
            <label
              key={idx.toString()}
              className={
                "absolute dark:text-darkGrey " +
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
