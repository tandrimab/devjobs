import JobCardBase from "./JobCardBase";
import FilterJobs from "./FilterJobs";

export default async function Home() {
  const res = await fetch('http://localhost:3000/api/jobs', {next:{revalidate: 3600}} );
  const data = await res.json();
  return (
    <main className=" min-h-screen flex items-center justify-between flex-col max-w-[85%] p-24 mx-auto mt-[-9rem] relative">
      <FilterJobs />
      <div className="grid gap-12 grid-cols-3 place-content-center w-full mt-12">
      {data && data.length ? data.map(item => (
        <JobCardBase data={item} />
      )) : null}
      </div>
    </main>
  )
}
