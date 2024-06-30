import Modal from "@/components/Modal";
import { mdiMagnify } from "@mdi/js";
import { mdiFilter } from "@mdi/js";
import Icon from "@mdi/react";
import { useState } from "react";
import Image from "next/image";
import SearchBoxAnimated from "@/components/SearchBoxAnimated";

export default function FilterJobsMob(props) {
  const [showHiddenFilter, setShowHiddenFilter] = useState();

  return (
    <>
      <div className="grid grid-cols-13 place-content-center w-full bg-white max-w-full rounded-[6px] p-2">
        <SearchBoxAnimated {...props} />
        <button
          onClick={() => setShowHiddenFilter(true)}
          className="sm:mr-3 md:mr-0"
        >
          <Icon path={mdiFilter} size="2rem" className="text-darkGrey" />
        </button>
        <button className="bg-lightBlue rounded-[6px] min-w-[3rem]">
          <Icon path={mdiMagnify} size="2rem" className="text-white mx-auto" />
        </button>
      </div>
      {showHiddenFilter && (
        <Modal
          onClose={() => setShowHiddenFilter(false)}
          modalClassName="backdrop-contrast-50 backdrop-blur-sm"
          bodyClassName="divide-y-[1px] divide-veryLightGrey md:w-1/2 sm:w-8/12"
        >
          <div className="flex items-center justify-start p-4">
            <Image
              src="/assets/desktop/icon-location.svg"
              width={24}
              height={24}
              className="my-2 mx-4"
              alt="location"
            />
            <input
              type="text"
              placeholder="Filter by location…"
              value={props.area}
              onChange={(e) => props.setArea(e.target.value)}
              className="outline-none w-full bg-transparent"
            />
          </div>
          <label className="flex items-center justify-start p-4 rounded-tr-[6px] rounded-br-[6px]">
            <input
              type="checkbox"
              checked={props.isFulltime}
              onChange={props.updateFullTime}
              className="peer appearance-none rounded-[3px] ring-0 bg-veryLightBlue w-[24px] h-[24px] checked:bg-lightBlue my-2 mx-4 relative shrink-0"
            />
            <label className="font-bold">Full Time Only</label>
            <Image
              src="/assets/desktop/icon-check.svg"
              className="absolute peer-checked:block ml-[1.2rem] hidden"
              height={20}
              width={20}
              alt="checked"
            />
          </label>
          <div className="px-8 mb-4 w-full border-none">
            <button className="bg-lightBlue text-white py-3 px-9 rounded-[6px] font-bold font-base hover:bg-btnDarkHover w-full hover-transition">
              Search
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}