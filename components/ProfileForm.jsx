"use client";
import profileSchema from "@/validationSchema/profileSchema";
import { useState, useRef, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
// import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function ProfileForm({ defaultValues }) {
  const router = useRouter();

  const [currentIdx, setCurrentIdx] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    trigger,
    getValues,
    control,
    setFocus,
  } = useForm({
    resolver: zodResolver(profileSchema),

    mode: "onSubmit",

    defaultValues: {
      
      selectedTab: "1",
      
      ...defaultValues,
      
      application: {
        ...defaultValues.application,
        skills: [
          ...defaultValues?.application?.skills || [],
          { skill: "" }],
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "application.skills",
  });

  const tabValue = watch("selectedTab");

  const header = {
    credentials: "include",
    "Content-Type": "application/json",
  };

  // const {
  //     placesService,
  //     placePredictions,
  //     getPlacePredictions,
  //     isPlacePredictionsLoading,
  // } = usePlacesService({
  //     apiKey: process.env.GOOGLE_MAP_API_KEY,
  // });

  const submitProfile = async () => {
    if (!Object.keys(errors).length) {
      if (tabValue === "4") {
        const profileDetails = getValues();
        
        delete profileDetails.selectedTab;

        // let skills = profileDetails?.application?.skills;
        
        // if (skills.length) {
        //   let skillsArr = [];
          
        //   for (let val of skills) {
            
        //     skillsArr.push(Object.values(val));
          
        //   }
        //   profileDetails.application = {
        //     ...profileDetails.application,
        //     skills: skillsArr
        //   }
        // }
        const options = {
          method: "POST",
          header,
          body: JSON.stringify({ profile: profileDetails }),
        };

        const toastId = toast.loading("Updating user details...");

        const response = await fetch(
          process.env.NEXTAUTH_URL + "/api/user/details",
          options
        );

        const responseJson = await response.json();

        if (!responseJson.success) {
          toast.update(toastId, {
            render: responseJson.message,
            type: "error",
            isLoading: false,
            className: "rotateY animated",
            autoClose: 5000,
          });
        } else {
          toast.update(toastId, {
            render:
              responseJson.message ||
              "Your profile details have been updated successfully.",
            type: "success",
            isLoading: false,
            className: "rotateY animated",
            autoClose: 5000,
            onClose: () => router.push("/profile/view")
          });
        }
      } else {
        setValue("selectedTab", (parseInt(tabValue) + 1).toString());
      }
    }
  };

  useEffect(() => {
    switch (tabValue) {
      case "1":
        if (!watch("personalDetails.name")) {
          setFocus("personalDetails.name");
        } else if (!watch("personalDetails.email")) {
          setFocus("personalDetails.email");
        } else {
          setFocus("personalDetails.location");
        }
        break;
      case "2":
        setFocus("education.college");
        break;
      case "3":
        setFocus("experience.company");
        break;
      case "4":
        setFocus(`application.skills.${currentIdx}.skill`);
        break;
    }
  }, [tabValue]);

  useEffect(() => {
    if (getValues()?.application?.skills?.length) {
      setCurrentIdx(getValues()?.application?.skills?.length)
    }
  }, []);

  // const options = {
  //   componentRestrictions: { country: "in" },
  //   fields: ["address_components", "geometry", "icon", "name"],
  //   types: ["establishment"],
  // };

  const roles = [
    "Software Engineer",
    "Frontend Engineer",
    "Backend Engineer",
    "Full-Stack Engineer",
    "Mobile Developer",
    "Android Developer",
    "iOS Developer",
    "Software Architect",
    "Machine Learning Engineer",
    "Embedded Engineer",
    "Data Engineer",
    "DevOps",
    "Engineering Manager",
    "QA Engineer",
    "Data Scientist",
  ];

  const degrees = [
    "Associate's Degree",
    "Bachelor's Degree",
    "Engineer's Degree",
    "Bachelor of Engineering (BEng)",
    "Bachelor of Science (BS)",
    "Master's Degree",
    "Master of Science (MS)",
    "Doctor of Philosophy (PhD)",
    "Non-Degree Program (e.g. Coursera certificate)",
    "Bachelor of Arts (BA)",
    "Master of Arts (MA)",
    "Bachelor of Business Administration (BBA)",
    "Master of Business Administration (MBA)",
    "Other",
  ];

  const yearsOfExperience = [
    "<1 year",
    ...Array.from({ length: 9 }, (_, i) => (i + 1).toString()),
    "10+ Years",
  ];

  // const gpaRef = useRef();
  const totalGpaRef = useRef();

  const onGpaKeypress = (event) => {
    if (event.key !== undefined) {
      if (event.target.value.length === 2) {
        totalGpaRef.current.focus();
      }
    }
  };

  const onTotalGpaKeypress = (event) => {
    if (event.key !== undefined) {
      if (event.key === "Backspace" && event.target.value === "") {
        gpaRef.current.focus();
      }
    }
  };

  return (
    <div className=" min-h-screen lg:max-w-[50%] md:max-w-[80%] max-w-full md:px-8 md:py-4 sm:px-4 sm:py-3 mx-auto lg:mt-[-3rem] md:mt-[-2rem] sm:mt-[-1rem] relative bg-white">
      <div className="flex md:flex-row sm:flex-col justify-between">
        <section className="flex md:flex-col sm:flex-row sm:items-center">
          <div
            className={
              "md:my-8 sm:my-2 md:pr-6 sm:pr-2 py-2 lg:hover:bg-transparent border-lightViolet  md:text-base sm:text-sm w-full " +
              (tabValue === "1"
                ? "md:border-r-4 md:border-b-0 sm:border-b-4 text-lightViolet font-bold"
                : "font-medium")
            }
          >
            <div
              className="cursor-pointer block pl-4 align-middle text-darkrey no-underline hover:text-lightViolet"
              onClick={() => setValue("selectedTab", "1")}
            >
              <span className="pb-4 md:pb-0">Personal Details</span>
            </div>
          </div>
          <div
            className={
              "my-8 md:pr-6 sm:pr-2 py-4 lg:hover:bg-transparent border-lightViolet md:text-base sm:text-sm w-full " +
              (tabValue === "2"
                ? "md:border-r-4 md:border-b-0 sm:border-b-4 text-lightViolet font-bold"
                : "font-medium")
            }
          >
            <div
              className="cursor-pointer block pl-4 align-middle text-darkrey no-underline hover:text-lightViolet"
              onClick={() => setValue("selectedTab", "2")}
            >
              <span className="pb-4 md:pb-0">Education</span>
            </div>
          </div>
          <div
            className={
              "my-8 md:pr-6 sm:pr-2 py-2 lg:hover:bg-transparent border-lightViolet md:text-base sm:text-sm w-full " +
              (tabValue === "3"
                ? "md:border-r-4 md:border-b-0 sm:border-b-4 text-lightViolet font-bold"
                : "font-medium")
            }
          >
            <div
              className="cursor-pointer block pl-4 align-middle text-darkrey no-underline hover:text-lightViolet"
              onClick={() => setValue("selectedTab", "3")}
            >
              <span className="pb-4 md:pb-0">Work Experience</span>
            </div>
          </div>
          <div
            className={
              "my-8 md:pr-6 sm:pr-2 py-4 lg:hover:bg-transparent border-lightViolet md:text-base sm:text-sm w-full " +
              (tabValue === "4"
                ? "md:border-r-4 md:border-b-0 sm:border-b-4 text-lightViolet font-bold"
                : "font-medium")
            }
          >
            <div
              className="cursor-pointer block pl-4 align-middle text-darkrey no-underline hover:text-lightViolet"
              onClick={() => setValue("selectedTab", "4")}
            >
              <span className="pb-4 md:pb-0">Application</span>
            </div>
          </div>
        </section>
        <div className="px-8 md:w-[80%] sm:w-auto">
          <form
            className="w-full mt-8"
            onSubmit={handleSubmit(submitProfile, (e) =>
              console.log("error", e)
            )}
          >
            {tabValue === "1" && (
              <div className="flex items-start flex-col">
                <p className="text-grey ml-auto mb-4 md:text-right sm:text-right">
                  Tell us about yourself so the startups know who you are
                </p>
                <label className="block text-lightBlue mb-2">Full name</label>
                <input
                  className="w-full p-2 rounded-[5px] border-veryLightBlue border-2 focus:border-lightBlue focus:border-1 outline-none"
                  {...register("personalDetails.name", { required: true })}
                />
                <p className="text-warning mt-2">
                  {errors.personalDetails?.name?.message}
                </p>
                <label className="block text-lightBlue mb-2">Email</label>
                <input
                  className="w-full p-2 rounded-[5px] border-veryLightBlue border-2 focus:border-lightBlue focus:border-1 outline-none"
                  {...register("personalDetails.email", { required: true })}
                />
                <p className="text-warning mt-2">
                  {errors.personalDetails?.email?.message}
                </p>
                {/*add default value*/}
                <label className="block text-lightBlue mb-2 mt-8">
                  Location
                </label>
                {/* <input
                                value={location}
                                placeholder="Debounce 500 ms"
                                onChange={(evt) => {
                                    getPlacePredictions({ input: evt.target.value });
                                    register("personalDetails.location", {
                                      required: true,
                                    })
                                }}
                                loading={isPlacePredictionsLoading}
                            /> */}
                <input
                  className="w-full p-2 rounded-[5px] border-veryLightBlue border-2 focus:border-lightBlue focus:border-1 outline-none"
                  {...register("personalDetails.location")}
                />
                <p className="text-warning mt-2">
                  {errors.personalDetails?.location?.message}
                </p>
                <div className="flex lg:flex-row mt-8 justify-between flex-wrap w-full sm:items-start">
                  <div className="flex lg:mb-0 items-center sm:mb-8">
                    <label htmlFor="role" className="text-lightBlue mr-4">
                      Role
                    </label>
                    <select
                      id="role"
                      className="bg-transparent p-2 rounded-[5px] border-veryLightBlue border-2 focus:border-lightBlue focus:border-1 sm:w-full lg:w-auto"
                      {...register("personalDetails.role")}
                    >
                      {roles.map((role, i) => (
                        <option key={`role-${i}`} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                    <p className="text-warning mt-2">
                      {errors.personalDetails?.role?.message}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <label
                      htmlFor="experience"
                      className="block text-lightBlue mr-4"
                    >
                      Years of Experience
                    </label>
                    <select
                      id="experience"
                      className="bg-transparent p-2 rounded-[5px] border-veryLightBlue border-2 focus:border-lightBlue focus:border-1"
                      {...register("personalDetails.experience")}
                    >
                      {yearsOfExperience.map((experience, i) => (
                        <option key={`experience-${i}`} value={experience}>
                          {experience}
                        </option>
                      ))}
                    </select>
                    <p className="text-warning mt-2">
                      {errors.personalDetails?.experience?.message}
                    </p>
                  </div>
                </div>
                <label
                  htmlFor="socialProfile"
                  className="block text-lightBlue mb-2 mt-8"
                >
                  Social Profile
                </label>
                <input
                  id="socialProfile"
                  className="w-full p-2 rounded-[5px] border-veryLightBlue border-2 focus:border-lightBlue focus:border-1 outline-none"
                  {...register("personalDetails.socialProfile")}
                />
                <p className="text-warning mt-2">
                  {errors.personalDetails?.socialProfile?.message}
                </p>

                <button
                  // type="submit"
                  onClick={async () => {
                    await trigger("personalDetails");
                  }}
                  className="py-3 px-8 mt-8 ml-auto transition ease-in-out delay-150 bg-lightBlue hover:-translate-y-1 hover:scale-110 hover:bg-darkBlue duration-300 text-white rounded-[5px]"
                >
                  Next
                </button>
              </div>
            )}
            {tabValue === "2" && (
              <div className="flex items-start flex-col">
                <p className="text-grey ml-auto md:text-right sm:text-right">
                  Tell us about your education
                </p>
                <label className="block text-lightBlue mb-2">
                  College / University
                </label>
                <input
                  className="w-full p-2 rounded-[5px] border-veryLightBlue border-2 focus:border-lightBlue focus:border-1 outline-none"
                  {...register("education.college")}
                />
                <p className="text-warning mt-2">
                  {errors.education?.college?.message}
                </p>
                <label className="block text-lightBlue mb-2 mt-8">
                  Graduated on
                </label>
                <input
                  type="date"
                  className="w-full p-2 rounded-[5px] border-veryLightBlue border-2 focus:border-lightBlue focus:border-1 outline-none"
                  {...register("education.graduationDate")}
                />
                <p className="text-warning mt-2">
                  {errors.education?.graduationDate?.message}
                </p>
                <div className="flex lg:flex-row items-center mt-8 flex-wrap w-full">
                  <label htmlFor="degree" className="text-lightBlue mr-4">
                    Degree
                  </label>
                  <select
                    id="degree"
                    className="flex-grow bg-transparent p-2 rounded-[5px] border-veryLightBlue border-2 focus:border-lightBlue focus:border-1"
                    {...register("education.degree")}
                  >
                    {degrees.map((degree) => (
                      <option value={degree}>{degree}</option>
                    ))}
                  </select>
                  <p className="text-warning mt-2">
                    {errors.education?.degree?.message}
                  </p>
                </div>
                <label className="block text-lightBlue mb-2 mt-8">Major</label>
                <input
                  className="w-full p-2 rounded-[5px] border-veryLightBlue border-2 focus:border-lightBlue focus:border-1 outline-none"
                  {...register("education.major")}
                />
                <p className="text-warning mt-2">
                  {errors.education?.major?.message}
                </p>
                <label className="block text-lightBlue mb-2 mt-8">
                  Score (GPA)
                </label>
                <input
                  type="number"
                  className="p-2 appearance-none w-full p-2 rounded-[5px] border-veryLightBlue border-2 focus:border-lightBlue focus:border-1 outline-none"
                  {...register("education.gpa")}
                />
                <p className="text-warning mt-2">
                  {errors.education?.gpa?.message}
                </p>
                <button
                  type="submit"
                  className="py-3 px-8 mt-8 ml-auto transition ease-in-out delay-150 bg-lightBlue hover:-translate-y-1 hover:scale-110 hover:bg-darkBlue duration-300 text-white rounded-[5px]"
                >
                  Next
                </button>
              </div>
            )}
            {tabValue === "3" && (
              <div className="flex items-start flex-col">
                <p className="text-grey ml-auto md:text-right sm:text-right">
                  Tell us about your work experience
                </p>
                <label className="block text-lightBlue mb-2">Company</label>
                <input
                  className="w-full p-2 rounded-[5px] border-veryLightBlue border-2 focus:border-lightBlue focus:border-1 outline-none"
                  {...register("experience.company")}
                />
                <p className="text-warning mt-2">
                  {errors.experience?.company?.message}
                </p>
                <label className="block text-lightBlue mb-2 mt-8">
                  Position
                </label>
                <input
                  className="w-full p-2 rounded-[5px] border-veryLightBlue border-2 focus:border-lightBlue focus:border-1 outline-none"
                  {...register("experience.position")}
                />
                <p className="text-warning mt-2">
                  {errors.experience?.position?.message}
                </p>
                <div className="flex items-center justify-between w-full flex-wrap">
                  <div className="flex lg:flex-row items-center mt-8">
                    <label
                      htmlFor="startDate"
                      className="text-lightBlue mr-4 whitespace-nowrap mb-2"
                    >
                      Started On
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      className="bg-transparent p-2 rounded-[5px] border-veryLightBlue border-2 focus:border-lightBlue focus:border-1"
                      {...register("experience.startDate")}
                    />
                    <p className="text-warning mt-2">
                      {errors.experience?.startDate?.message}
                    </p>
                  </div>
                  {!watch("experience").stillWorking && (
                    <div className="animate-fadeIn flex lg:flex-row items-center mt-8 ">
                      <label className="text-lightBlue mr-4 whitespace-nowrap mb-2">
                        Last Date
                      </label>
                      <input
                        type="date"
                        className="w-full p-2 rounded-[5px] border-veryLightBlue border-2 focus:border-lightBlue focus:border-1 outline-none"
                        {...register("experience.endDate")}
                      />
                      <p className="text-warning mt-2">
                        {errors.experience?.endDate?.message}
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex flex-nowrap items-center mt-8">
                  <input
                    type="checkbox"
                    {...register("experience.stillWorking")}
                  />
                  <label className="block text-lightBlue ml-4">
                    I am still working here
                  </label>
                </div>
                <label className="block text-lightBlue mb-2 mt-8">
                  Describe Your Role
                </label>
                <textarea
                  className="p-2 appearance-none w-full p-2 rounded-[5px] border-veryLightBlue border-2 focus:border-lightBlue focus:border-1 outline-none"
                  {...register("experience.jobDescription")}
                />
                <p className="text-warning mt-2">
                  {errors.experience?.jobDescription?.message}
                </p>
                <button
                  type="submit"
                  className="py-3 px-8 mt-8 ml-auto transition ease-in-out delay-150 bg-lightBlue hover:-translate-y-1 hover:scale-110 hover:bg-darkBlue duration-300 text-white rounded-[5px]"
                >
                  Next
                </button>
              </div>
            )}
            {tabValue === "4" && (
              <div className="flex items-start flex-col">
                <p className="text-grey ml-auto md:text-right sm:text-right">Write about your skills</p>
                <label htmlFor="skills" className="block text-lightBlue mb-2">
                  Your Skills
                </label>
                <div className="grid lg:grid-cols-[repeat(4,_auto)] sm:grid-cols-[repeat(3,_auto)] gap-3 w-full justify-stretch  ">
                  {/* {updatedSkills.length ? updatedSkills.map((skill, id) => (
                    <div
                    key={id}
                    className="flex flex-nowrap px-4 py-2 border-lightBlue border"
                  >
                    <label key={id}>
                      <p className="text-lightBlue text-sm">
                        {skill}
                      </p>
                    </label>
                    <button
                      type="button"
                      className="ml-auto"
                      onClick={() => {
                        let skillArr = updatedSkills;
                        skillArr.splice(id, 1);
                        setUpdatedSkills(skillArr)
                      }}
                    >
                      X
                    </button>
                  </div>
                  )): null} */}
                  {fields.map(
                    (skill, index) =>
                      skill.skill !== "" && (
                        <div
                          className="flex flex-nowrap px-4 py-2 border-lightBlue border"
                          key={skill.id}
                        >
                          <label key={skill.id}>
                            <p className="text-lightBlue text-sm">
                              {skill.skill}
                            </p>
                          </label>
                          <button
                            type="button"
                            className="ml-auto"
                            onClick={() => remove(index)}
                          >
                            X
                          </button>
                        </div>
                      )
                  )}
                </div>
                <input
                  className="bg-transparent mt-4 p-2 rounded-[5px] border-veryLightBlue border-2 focus:border-lightBlue focus:border-1"
                  {...register(`application.skills.${currentIdx}.skill`)}
                  onKeyDown={async (e) => {
                    if (e.key === "Enter") {
                      e.stopPropagation();
                      e.preventDefault();
                      if (
                        getValues().application?.skills &&
                        getValues().application?.skills[currentIdx]?.skill !==
                          ""
                      ) {
                        append({ skill: "" });
                        setCurrentIdx((prev) => prev + 1);
                      }
                    }
                  }}
                />
                <p className="text-warning mt-2">
                  {errors?.application?.skills
                    ? errors?.application?.skills?.skills?.message
                    : null}
                </p>
                <button
                  type="button"
                  className="text-lightBlue"
                  onClick={async (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (
                      getValues().application?.skills &&
                      getValues().application?.skills[currentIdx]?.skill !== ""
                    ) {
                      append({ skill: "" });
                      setCurrentIdx((prev) => prev + 1);
                    }
                  }}
                >
                  + Add skill
                </button>
                <label className="block text-lightBlue mb-2 mt-8">
                  Cover Letter For Your Applied Role
                </label>
                <textarea
                  className="min-h-[10rem] p-2 appearance-none w-full p-2 rounded-[5px] border-veryLightBlue border-2 focus:border-lightBlue focus:border-1 outline-none"
                  {...register("application.coverLetter")}
                />
                <p className="text-warning mt-2">
                  {errors.application?.coverLetter?.message}
                </p>

                <button
                  type="submit"
                  className="py-3 px-8 mt-8 ml-auto transition ease-in-out delay-150 bg-lightBlue hover:-translate-y-1 hover:scale-110 hover:bg-darkBlue duration-300 text-white rounded-[5px]"
                >
                  Next
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
