"use client"
import Image from "next/image";
import useStore from "../../store/store";
import { useState } from "react";
import Link from "next/link";

export default function JobPage({ params }) {
    const jobs = useStore((state) => state.jobs);
    const job = jobs.find((item) => item.id == params.id);
    if (!job) {
        throw new Error("Page not found")
    }
    return (
        <div>
            <div className="min-h-screen flex items-center justify-between flex-col lg:max-w-[50%] md:max-w-[90%] sm:max-w-[90%] mx-auto lg:mt-[-4rem] md:mt-[-2rem] sm:mt-[-1rem] sm:mb-[1rem] shrink-0relative">
                <div className="flex md:flex-row sm:flex-col bg-white w-full rounded-[6px] sm:flex-col sm:items-center">
                    <div className="md:w-[140px] md:h-[140px] sm:w-[3rem] sm:h-[3rem] sm:p-4 flex items-center relative sm:mt-[-1rem] md:mt-0" style={{ backgroundColor: job.companyDetails.logoBackground }}>
                        <Image src={job.companyDetails.logo} alt="company logo" className="m-auto " height={50} width={50} />
                    </div>
                    <div className="flex items-center justify-between py-8 px-12 w-full md:flex-row sm:flex-col">
                        <div className="sm:text-center md:text-left">
                            <p className="font-bold text-2xl mb-2">{job.companyDetails.name}</p>
                            <p className="text-darkGrey shrink-0">{job.companyDetails.website}</p>
                        </div>
                        <Link href={job.companyDetails.website} className="bg-btnVeryLight text-lightBlue p-4 font-bold rounded-[5px] hover:bg-btnLightHover sm:mt-8 md:mt-0 shrink-0">Company Site</Link>
                    </div>
                </div>
                <div className="flex bg-white w-full rounded-[6px] md:px-12 md:py-10 sm:px-8 sm:py-8 flex-col mt-8">
                    <div className="flex justify-between items-center w-full mb-12 md:flex-row sm:flex-col">
                        <div className="w-full">
                            <div className="text-darkGrey flex mb-2">
                                <p>{job.postedAt}</p>
                                <div className="rounded-full bg-darkGrey h-[4px] w-[4px] mx-4 my-auto" />
                                <p>{job.contract}</p>
                            </div>
                            <p className="font-bold text-3xl mb-2">{job.position}</p>
                            <p className="font-bold text-lightBlue text-sm">{job.location}</p>
                        </div>
                        <button className="bg-lightBlue rounded-[5px] text-white font-bold py-4 px-8 shrink-0 sm:w-full md:w-auto sm:mt-8 md:mt-0">
                            Apply Now
                        </button>
                    </div>
                    <p className="text-darkGrey">{job.description}</p>
                    {job?.requirements?.content && <div className="mt-12">
                        <p className="font-bold text-xl mb-8">Requirements</p>
                        {job?.requirements?.content && <p className="text-darkGrey">{job.requirements.content}</p>}
                        {job?.requirements?.items && job.requirements.items.length ?
                            <ul className="list-disc text-darkGrey mt-8 pl-4 space-y-2 marker:text-lightBlue">
                                {job.requirements.items.map(item => (
                                    <li className="pl-4">{item}</li>
                                ))}
                            </ul> : null}
                    </div>}
                    {job?.role?.content && <div className="mt-12">
                        <p className="font-bold text-xl mb-8">What You Will Do</p>
                        {job?.role?.content && <p className="text-darkGrey">{job.role.content}</p>}
                        {job?.role?.items && job.role.items.length ?
                            <ol className="list-decimal text-darkGrey mt-8 pl-4 space-y-2 marker:text-lightBlue marker:font-bold">
                                {job.role.items.map(item => (
                                    <li className="pl-4">{item}</li>
                                ))}
                            </ol> : null}
                    </div>}
                </div>
            </div>
            <div className="w-full bg-white">
                <div className="lg:max-w-[50%] md:max-w-[90%] sm:max-w-[90%] flex mx-auto justify-between items-center md:py-4 sm:py-4">
                    <div className="sm:hidden md:block">
                        <p className="text-xl font-bold mb-2">{job.position}</p>
                        <p className="text-darkGrey">{job.company}</p>
                    </div>
                    <button className="bg-lightBlue rounded-[5px] text-white font-bold py-4 px-8 sm:w-full md:w-auto">
                        Apply Now
                    </button>
                </div>
            </div>
        </div>
    )
}