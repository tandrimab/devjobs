import AppliedJobs from "./AppliedJobs";

export default function ShowCompany({ companies }) {
  return (
    <div className="min-h-screen lg:max-w-[50%] md:max-w-[90%] sm:max-w-[90%] mx-auto lg:mt-[2rem] shrink-0relative rounded-[6px]">
      <div className="flex flex-col w-full rounded-[6px] sm:flex-col sm:items-center">
        {companies?.map((company) => (
          <AppliedJobs data={company} key={company.jobId} />
        ))}
      </div>
    </div>
  );
}
