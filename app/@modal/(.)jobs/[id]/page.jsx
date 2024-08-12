'use client'
import {useStore} from "../../../store/store"
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";

export default function JobModal({ params }) {
    const jobs = useStore((state) => state.jobs);
    const job = jobs.find((item) => item.id == params.id);
    const [open, setOpen] = useState(true);
    const router = useRouter();
    

    return (
        <Modal modalClassName="p-6 backdrop-blur-xl backdrop-contrast-50 bg-black/60" bodyClassName="sm:w-10/12 md:w-8/12 lg:w-1/2">
            <div className="px-12 pt-8">
                <div className="flex bg-white w-full rounded-[6px]">
                    <div className="w-[140px] h-[140px] flex items-center relative" style={{ backgroundColor: job.companyDetails?.logoBackground }}>
                        <Image src={job?.companyDetails?.logo} alt="company logo" className="m-auto " height={50} width={50} />
                    </div>
                    <div className="flex lg:flex-row items-center justify-between lg:py-8 lg:px-12 w-full sm:flex-col sm:items-start sm:p-0 sm:pl-4">
                        <div>
                            <p className="font-bold text-2xl mb-2">{job?.companyDetails?.name}</p>
                            <p className="text-darkGrey">{job?.companyDetails?.website}</p>
                        </div>
                        <button className="bg-btnVeryLight text-lightBlue p-4 font-bold rounded-[5px] text-sm cursor-pointer hover:bg-btnDarkHover hover:text-white hover-transition"
                        onClick={() => window.location.reload()}>Show More</button>
                    </div>
                </div>
            </div>
            <div className="px-12 pb-8 mt-8">
                <div className="flex justify-between items-center w-full mb-12">
                    <div>
                        <div className="text-darkGrey flex mb-2">
                            <p>{job?.postedAt}</p>
                            <div className="rounded-full bg-darkGrey h-[4px] w-[4px] mx-4 my-auto" />
                            <p>{job?.contract}</p>
                        </div>
                        <p className="font-bold text-2xl mb-2 text-black">{job?.position}</p>
                        <p className="font-bold text-lightBlue text-sm">{job?.location}</p>
                    </div>
                </div>
                <p className="text-darkGrey">{job?.description}</p>
            </div>
            </Modal>
    )
}