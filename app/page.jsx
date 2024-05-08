"use client"
import JobCardBase from "./JobCardBase";
import FilterJobs from "./(filter)/FilterJobs";
import {useStore} from "./store/store";
import { useState, useEffect } from "react";


export default function Home() {
  const [jobDetails, setJobDetails] = useState([]);
  const setJobs = useStore((state) => state.setJobs);
  const jobs = useStore((state) => state.jobs);

    useEffect(() => {
        async function fetchAPI() {
            if (jobs.length) {
              setJobDetails(jobs);
            } else {
              const res = await fetch('http://localhost:3000/api/jobs', {next:{revalidate: 3600}} );
              const data = await res.json();
              setJobDetails(data);
              setJobs(data);
            }
        }
        fetchAPI();
    }, []);
  
  return (
    
    <main className=" min-h-screen flex items-center justify-between flex-col lg:max-w-[80%] max-w-full md:px-8 md:py-4 sm:px-8 sm:py-3 mx-auto lg:mt-[-3rem] md:mt-[-3rem] sm:mt-[-2rem] relative">
      <FilterJobs />
      <div className="grid lg:gap-12 lg:grid-cols-3 place-content-center w-full mt-12 md:grid-cols-2 md:gap-3 gap-0 sm:grid-cols-1 mb-6">
      {jobDetails && jobDetails.length ? jobDetails.map((item, id) => (
        <JobCardBase data={item} id={id} />
      )) : null}
      </div>
    </main>
  )
}
