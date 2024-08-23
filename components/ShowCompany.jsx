import AppliedJobs from "./AppliedJobs";
import NoAppliedCompany from "./NoAppliedCompany";

export default function ShowCompany({ companies }) {
  return (
    <div className="min-h-screen lg:max-w-[50%] md:max-w-[90%] sm:max-w-[90%] mx-auto lg:mt-[2rem] shrink-0relative rounded-[6px]">
      <div className="flex flex-col w-full rounded-[6px] sm:flex-col sm:items-center">
        {companies.length ? (
          companies?.map((company) => (
            <AppliedJobs data={company} key={company.jobId} />
          ))
        ) : (
          <NoAppliedCompany
            redirectUrl="/"
            text="...maybe you could explore and find a perfect match"
            btnText="Explore"
            mainText="No application found"
          />
        )}
      </div>
    </div>
  );
}
