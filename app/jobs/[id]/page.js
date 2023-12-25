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
            <div className="min-h-screen flex items-center justify-between flex-col max-w-[50%] p-24 mx-auto mt-[-9rem] relative">
                <div className="flex bg-white w-full rounded-[6px]">
                    <div className="w-[140px] h-[140px] flex items-center" style={{ backgroundColor: job.logoBackground }}>
                        <img src={job.logo} alt="company logo" className="m-auto min-h-[20px]" />
                    </div>
                    <div className="flex items-center justify-between py-8 px-12 w-full">
                        <div>
                            <p className="font-bold text-2xl mb-2">{job.company}</p>
                            <p className="text-darkGrey">{job.website}</p>
                        </div>
                        <Link href={job.website} className="bg-btnLightHover text-lightBlue p-4 font-bold rounded-[5px]">Company Site</Link>
                    </div>
                </div>
                <div className="flex bg-white w-full rounded-[6px] px-12 py-10 flex-col mt-8">
                    <div className="flex justify-between items-center w-full mb-12">
                        <div>
                            <div className="text-darkGrey flex mb-2">
                                <p>{job.postedAt}</p>
                                <div className="rounded-full bg-darkGrey h-[4px] w-[4px] mx-4 my-auto" />
                                <p>{job.contract}</p>
                            </div>
                            <p className="font-bold text-3xl mb-2">{job.position}</p>
                            <p className="font-bold text-lightBlue text-sm">{job.location}</p>
                        </div>
                        <button className="bg-lightBlue rounded-[5px] text-white font-bold py-4 px-8">
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
                <div className="max-w-[50%] flex mx-auto justify-between items-center px-24 py-4">
                    <div>
                        <p className="text-xl font-bold mb-2">{job.position}</p>
                        <p className="text-darkGrey">{job.company}</p>
                    </div>
                    <button className="bg-lightBlue rounded-[5px] text-white font-bold py-4 px-8">
                        Apply Now
                    </button>
                </div>
            </div>
        </div>
    )
}