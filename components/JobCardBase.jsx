import Image from "next/image";
import Link from "next/link";


export default function JobCardBase(props) {
    return (
        <div className="bg-white dark:bg-veryDarkBlue rounded-[6px] px-8 py-8 cursor-pointer lg:max-w-md max-w-full relative mt-8 sm:mx-auto sm:w-full hover:transition-all hover:delay-100 hover:duration-500 hover:scale-110">
            <Link href={`/jobs/${encodeURIComponent(props.data?.id)}`} key={props.id}>
                <div className="h-[50px] w-[50px] rounded-[12px] absolute top-[-1.5rem] flex" style={{ backgroundColor: props.data?.companyDetails?.logoBackground }}>
                    <Image className="items-center justify-center m-auto" src={props.data?.companyDetails?.logo} height={20} width={20} alt="logos" />
                </div>
                <div className="flex text-darkGrey font-base mt-4">
                    <p className="dark:text-darkGrey">{props.data?.postedAt}</p>
                    <div className="rounded-full bg-darkGrey h-[4px] w-[4px] mx-4 my-auto" />
                    <p>{props.data?.contract}</p>
                </div>
                <p className="text-xl hover:text-darkGrey font-bold mt-4 dark:text-white">{props.data?.position}</p>
                <p className="text-base text-darkGrey mt-4">{props.data?.companyDetails?.name}</p>
                <p className="text-sm text-lightBlue font-bold mt-6">{props.data?.location}</p>
            </Link>
        </div>
    )
}