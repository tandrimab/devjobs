import { mdiMagnify } from "@mdi/js";
import { mdiFilter } from "@mdi/js";
import Icon from "@mdi/react";
import Image from "next/image";

export default function FilterJobsMob(props) {
    return (
        <div className="grid grid-cols-13 place-content-center w-full bg-white max-w-full rounded-[6px] p-2">
            <div className="flex items-center justify-start p-4 rounded-tl-[6px] rounded-bl-[6px]">
                <input
                    type="text"
                    placeholder="Filter by title, companies, expertise…"
                    value={props.searchTitle}
                    onChange={(e) => props.setSearchTitle(e.target.value)}
                    className="outline-none w-full bg-transparent"
                />
            </div>
            <button>
                <Icon
                    path={mdiFilter}
                    size="2rem"
                    className="text-darkGrey"
                />
            </button>
            <button className="bg-lightBlue rounded-[6px] min-w-[3rem]">
                <Icon
                    path={mdiMagnify}
                    size="2rem"
                    className="text-white mx-auto"
                />
            </button>
        </div>
    )
}