"use client"
import { Checkbox } from "@material-tailwind/react";
import Image from "next/image";
import { useRef, useState } from "react"

export default function FilterJobs() {
    const [search, setSearch] = useState('');
    const [area, setArea] = useState('');
    const [isFulltime, setIsFulltime] = useState();
    const check = useRef();

    const updateFullTime = (e) => {
        setIsFulltime(!isFulltime);
    }

    return (
        <div className=" grid grid-cols-3 place-content-center w-full divide-x-[1px] divide-veryLightGrey">
            <div className="flex items-center justify-start p-6 bg-white rounded-tl-[6px] rounded-bl-[6px]">
                <Image src="/assets/desktop/icon-search.svg" width={24} height={24} className="my-2 mx-4" />
                <input
                    type="text"
                    placeholder="Filter by title, companies, expertise…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full"
                />
            </div>
            <div className="flex items-center justify-start p-6 bg-white">
                <Image src="/assets/desktop/icon-location.svg" width={24} height={24} className="my-2 mx-4" />
                <input
                    type="text"
                    placeholder="Filter by location…"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full"
                />
            </div>
            <label className="flex items-center justify-start p-6 bg-white rounded-tr-[6px] rounded-br-[6px]">
                <input
                    ref={check}
                    type="checkbox"
                    checked={isFulltime}
                    onChange={updateFullTime}
                    className="peer appearance-none rounded-[3px] ring-0 bg-veryLightBlue w-[24px] h-[24px] checked:bg-lightBlue my-2 mx-4 relative shrink-0"
                />
                <label className="font-bold">Full Time Only</label>
                <Image src="/assets/desktop/icon-check.svg" className="absolute peer-checked:block ml-[1.2rem] hidden" height={20} width={20} alt="checked" />
                <button className="bg-lightBlue text-white py-3 px-9 rounded-[6px] font-bold font-base ml-auto hover:bg-btnDarkHover">Search</button>
            </label>
        </div>
    )
}