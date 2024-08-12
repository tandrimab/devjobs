import { mdiChevronRight } from "@mdi/js";
import Icon from "@mdi/react";
import Image from "next/image";
import Link from "next/link";

export default function AppliedJobs({ data }) {
  const dayDiff = Math.floor((Date.now() - new Date(data?.createdAt)) / (1000 * 60 * 60 * 24));
  const hourDiff = Math.floor(((Date.now() - new Date(data?.createdAt)) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  return (
    <div className="relative cursor-pointer w-full flex items-center shadow-[0_0_25px_#9DAEC2] bg-white hover:transition-all hover:delay-100 hover:duration-500 hover:scale-110 rounded-[12px] mt-4">
      <div
        className="md:w-[140px] md:h-[140px] sm:w-[3rem] sm:h-[3rem] sm:p-4 flex items-center relative sm:mt-[-1rem] md:mt-0"
        style={{ backgroundColor: data?.companyDetails?.logoBackground }}
      >
        <Image
          src={data?.companyDetails?.logo}
          alt="company logo"
          className="m-auto "
          height={60}
          width={60}
        />
      </div>
      <Link href={"/jobs/" + data?.details?.id}>
        <div className="flex flex-col justify-evenly h-full ml-3">
          <div className="flex text-darkGrey font-base">
            <p className="">{`${dayDiff}days ${hourDiff}h ago`}</p>
            <div className="rounded-full bg-darkGrey h-[4px] w-[4px] mx-4 my-auto" />
            <p>{data?.details?.contract}</p>
          </div>
          <p className="text-xl font-medium mt-3">{data?.companyDetails?.name}</p>
          <p className="text-base text-darkBlue font-medium mt-3">
            {data?.details?.position}
          </p>
        </div>
      </Link>
      <Icon
        path={mdiChevronRight}
        size={1}
        className="absolute right-5 top-5"
      />
    </div>
  );
}
