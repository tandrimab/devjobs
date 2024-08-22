"use client"
import JobCardBase from "../../components/JobCardBase";
import FilterJobs from "../../components/FilterJobs";
import {useFilteredJobs, useStore} from "../store/store";
import { useState, useEffect } from "react";


export default function Home() {
  const setJobs = useStore((state) => state.setJobs);
  const jobs = useStore((state) => state.jobs);
  const setFilteredJobs = useFilteredJobs((state) => state.setFilteredJobs);
  const filteredJobs = useFilteredJobs((state) => state.filteredJobs);

  const filtered = filteredJobs.length ? filteredJobs : jobs; 

    useEffect(() => {
        async function fetchAPI() {
            if (!jobs.length) {
              const res = await fetch(process.env.NEXTAUTH_URL + '/api/jobs', {next:{revalidate: 3600}} );
              const data = await res.json();
              setJobs([...data]);
              setFilteredJobs(data);
            }
        }
        fetchAPI();
    }, []);
  
  return (
    
    <main className=" min-h-screen flex items-center flex-col lg:max-w-[80%] max-w-full md:px-8 md:py-4 sm:px-8 sm:py-3 mx-auto lg:mt-[-3rem] md:mt-[-3rem] sm:mt-[-2rem] relative">
      <FilterJobs />
      <div className="grid lg:gap-12 lg:grid-cols-3 place-content-center w-full mt-12 md:grid-cols-2 md:gap-3 gap-0 sm:grid-cols-1 mb-6">
      {filtered && filtered.length ? filtered.map((item, id) => (
        <JobCardBase data={item} id={id} />
      )) : null}
      </div>
    </main>
  )
}
