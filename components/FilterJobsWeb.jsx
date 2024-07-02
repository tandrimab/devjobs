import SearchBoxAnimated from "@/components/SearchBoxAnimated";
import Image from "next/image";

export default function FilterJobsWeb(props) {
  return (
    <div className=" grid grid-cols-3 place-content-center w-full divide-x-[1px] divide-veryLightGrey bg-white max-w-full rounded-[6px]">
      <SearchBoxAnimated {...props} />
      <div className="flex items-center justify-start p-4">
        <Image
          src="/assets/desktop/icon-location.svg"
          width={24}
          height={24}
          className="my-2 mx-4"
          alt="location"
        />
        <input
          name="location"
          type="text"
          placeholder="Filter by location…"
          value={props.filters.location}
          onChange={props.handleSearchInput}
          className="outline-none w-full bg-transparent"
        />
      </div>
      <label className="flex items-center justify-start p-4 rounded-tr-[6px] rounded-br-[6px]">
        <input
          name="isFulltime"
          type="checkbox"
          checked={props.filters.isFulltime}
          onChange={props.handleSearchInput}
          className="peer appearance-none rounded-[3px] ring-0 bg-veryLightBlue w-[24px] h-[24px] checked:bg-lightBlue my-2 mx-4 relative shrink-0"
        />
        <label className="font-bold">Full Time</label>
        <Image
          src="/assets/desktop/icon-check.svg"
          className="absolute peer-checked:block ml-[1.2rem] hidden"
          height={20}
          width={20}
          alt="checked"
        />
        <button
        onClick={props.clearFilters}
        className="bg-lightBlue text-white py-3 px-9 rounded-[6px] font-bold font-base ml-auto hover:bg-btnDarkHover hover-transition">
          Clear
        </button>
      </label>
    </div>
  );
}
