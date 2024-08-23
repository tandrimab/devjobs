"use client";
import Image from "next/image";
import { useStore } from "../../../store/store";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { HEADERS } from "@/public/constants/requestHeaders";
import useFetch from "@/utilities/hooks/useFetch";
import Icon from "@mdi/react";
import { toast } from "react-toastify";
import DotsLoader from "@/components/DotsLoader";
import { mdiCheck } from "@mdi/js";

const url = process.env.NEXTAUTH_URL + "/api/user/appliedCompanies";

export default function JobPage({ params }) {
  const jobs = useStore((state) => state.jobs);
  const job = jobs.find((item) => item.id == params.id);
  const { data: session } = useSession();
  const [fetchData, setFetchData] = useState(false);
  const [isApplied, setIsApplied] = useState();

  useEffect(() => {
    const controller = new AbortController();
    async function fetchApi() {
      try {
        const resp = await fetch(process.env.NEXTAUTH_URL + '/api/user/appliedCompanies/' + params.id, {signal: controller.signal});
        const data = await resp.json();

        if (data && data.success) {
          setIsApplied(true);
        }
      } catch(e) {
        toast.error(e)
      }
    }
    fetchApi();
    return () => controller.abort();
  }, []);

  const requestOptions = {
    ...HEADERS.POST_REQUEST,
    body: JSON.stringify({
      jobId: params.id,
    }),
  };

  const { data, loading, error } = useFetch(
    url,
    requestOptions,
    fetchData
  );

  if (error) {
    toast.error(error);
  }

  const renderButton = () => {
    if (!data && !loading && !isApplied) {
      return (
        <button
          onClick={() => setFetchData((val) => !val)}
          className="bg-lightBlue rounded-[5px] text-white font-bold py-4 px-8 shrink-0 sm:w-full md:w-auto sm:mt-8 md:mt-0"
        >
          Apply Now
        </button>
      );
    } else if (loading) {
      return (
        <div className="flex items-center bg-lightBlue rounded-[5px] text-white font-bold py-4 px-8 shrink-0 sm:w-full md:w-auto sm:mt-8 md:mt-0">
          <svg
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>Processing...
        </div>
      );
    } else if ((data && data.success) || isApplied) {
      return (
        <div className="cursor-not-allowed animate-btnZoom flex items-center bg-lightBlue rounded-[5px] text-white font-bold py-4 px-8 shrink-0 sm:w-full md:w-auto sm:mt-8 md:mt-0">
          <span className="mr-2 bg-green-500 rounded-full text-white">
            <Icon path={mdiCheck} size={1} color="white" />
          </span>
          Applied
        </div>
      );
    }
  };
  
  return job && Object.keys(job).length ? (
    <div>
      <div className="min-h-screen flex items-center justify-between flex-col lg:max-w-[50%] md:max-w-[90%] sm:max-w-[90%] mx-auto lg:mt-[-4rem] md:mt-[-2rem] sm:mt-[-1rem] sm:mb-[1rem] shrink-0relative">
        <div className="flex md:flex-row bg-white w-full rounded-[6px] sm:flex-col sm:items-center">
          <div
            className="md:w-[140px] md:h-[140px] sm:w-[3rem] sm:h-[3rem] sm:p-4 flex items-center relative sm:mt-[-1rem] md:mt-0"
            style={{ backgroundColor: job?.companyDetails?.logoBackground }}
          >
            <Image
              src={job?.companyDetails?.logo}
              alt="company logo"
              className="m-auto "
              height={50}
              width={50}
            />
          </div>
          <div className="flex items-center justify-between py-8 px-12 w-full md:flex-row sm:flex-col">
            <div className="sm:text-center md:text-left">
              <p className="font-bold text-2xl mb-2">
                {job?.companyDetails?.name}
              </p>
              <p className="text-darkGrey shrink-0">
                {job?.companyDetails?.website}
              </p>
            </div>
            <Link
              href={job?.companyDetails?.website}
              className="bg-btnVeryLight text-lightBlue p-4 font-bold rounded-[5px] hover:bg-btnLightHover sm:mt-8 md:mt-0 shrink-0 hover-transition"
            >
              Company Site
            </Link>
          </div>
        </div>
        <div className="flex bg-white w-full rounded-[6px] md:px-12 md:py-10 sm:px-8 sm:py-8 flex-col mt-8">
          <div className="flex justify-between items-center w-full mb-12 md:flex-row sm:flex-col">
            <div className="w-full">
              <div className="text-darkGrey flex mb-2">
                <p>{job?.postedAt}</p>
                <div className="rounded-full bg-darkGrey h-[4px] w-[4px] mx-4 my-auto" />
                <p>{job?.contract}</p>
              </div>
              <p className="font-bold text-3xl mb-2">{job?.position}</p>
              <p className="font-bold text-lightBlue text-sm">
                {job?.location}
              </p>
            </div>
            {session && renderButton()}
          </div>
          <p className="text-darkGrey">{job?.description}</p>
          {job?.requirements?.content && (
            <div className="mt-12">
              <p className="font-bold text-xl mb-8">Requirements</p>
              {job?.requirements?.content && (
                <p className="text-darkGrey">{job?.requirements.content}</p>
              )}
              {job?.requirements?.items && job?.requirements.items.length ? (
                <ul className="list-disc text-darkGrey mt-8 pl-4 space-y-2 marker:text-lightBlue">
                  {job?.requirements.items.map((item) => (
                    <li className="pl-4" key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          )}
          {job?.role?.content && (
            <div className="mt-12">
              <p className="font-bold text-xl mb-8">What You Will Do</p>
              {job?.role?.content && (
                <p className="text-darkGrey">{job?.role.content}</p>
              )}
              {job?.role?.items && job?.role.items.length ? (
                <ol className="list-decimal text-darkGrey mt-8 pl-4 space-y-2 marker:text-lightBlue marker:font-bold">
                  {job?.role.items.map((item) => (
                    <li className="pl-4" key={item}>{item}</li>
                  ))}
                </ol>
              ) : null}
            </div>
          )}
        </div>
      </div>
      <div className="w-full bg-white">
        <div className="lg:max-w-[50%] md:max-w-[90%] sm:max-w-[90%] flex mx-auto justify-between items-center md:py-4 sm:py-4">
          <div className="sm:hidden md:block">
            <p className="text-xl font-bold mb-2">{job?.position}</p>
            <p className="text-darkGrey">{job?.company}</p>
          </div>
          {session && renderButton()}
        </div>
      </div>
    </div>
  ) : (
    <DotsLoader />
  );
}
