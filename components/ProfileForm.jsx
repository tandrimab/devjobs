"use client";
import profileSchema from "@/validationSchema/profileSchema";
import { useState, useRef, useEffect } from "react";
import {
  useForm,
  useFieldArray,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import usePlacesAutocomplete from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import useWindowSize from "@/utilities/hooks/useWindowSize";
import Image from "next/image";
import Icon from "@mdi/react";
import { mdiCardAccountDetailsOutline } from "@mdi/js";
import { mdiBookEducationOutline } from "@mdi/js";
import { mdiApplicationEditOutline } from "@mdi/js";
import { mdiBriefcaseOutline } from "@mdi/js";

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
        skills: [...(defaultValues?.application?.skills || []), { skill: "" }],
      },
    },
  });

  const [width, _] = useWindowSize();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "application.skills",
  });

  const tabValue = watch("selectedTab");

  const header = {
    credentials: "include",
    "Content-Type": "application/json",
  };

  const {
    ready,
    value,
    setValue: setPlacesValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 500,
    defaultValue: defaultValues?.personalDetails?.location,
  });

  const submitProfile = async () => {
    if (!Object.keys(errors).length) {
      if (tabValue === "4") {
        const profileDetails = getValues();

        delete profileDetails.selectedTab;

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
            onClose: () => router.push("/profile/view"),
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
      setCurrentIdx(getValues()?.application?.skills?.length);
    }
  }, []);

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

  const handleLocationInput = (e) => {
    setPlacesValue(e.target.value);
  };

  const handleLocationSelect = (description) => {
    setPlacesValue(description, false);
    setValue("personalDetails.location", description);
    clearSuggestions();
  };

  return (
    <div className=" min-h-screen flex justify-center mt-4 dark:bg-midnight">
      <div className={"m-4 shadow-black-white dark:shadow-blue-border rounded-[12px] bg-lightGrey dark:bg-veryDarkBlue mx-auto flex justify-between max-w-[1100px] min-h-[700px] " + (width < 991 ? "flex-col w-[90%]" : "flex-row max-h-[800px] w-[80%]")}>
        <div className={"bg-btnLightHover " + (width < 991 ? "w-[100%] min-h-[450px] rounded-[12px] " : "w-[35%] rounded-[50px] rounded-l-[12px]")}>
          {tabValue === "1" && (
            <div className="flex flex-col my-auto justify-center items-center h-full p-4">
              <p className="text-3xl mb-12 text-veryDarkBlue dark:text-violet">Personal Details</p>
              <div className="relative">
                <Image
                  src="/assets/desktop/details.svg"
                  height={300}
                  width={300}
                  alt="personal-details"
                />
              </div>
              <p className="text-sm mt-4 text-center dark:text-violet">
                  Tell us about yourself so the startups know who you are
                </p>
            </div>
          )}
          {tabValue === "2" && (
            <div className="flex flex-col my-auto justify-center items-center h-full p-4">
              <p className="text-3xl mb-12 text-veryDarkBlue dark:text-violet">Education</p>
              <div className="relative">
                <Image
                  src="/assets/desktop/education.svg"
                  height={300}
                  width={300}
                  alt="education"
                />
              </div>
              <p className="text-sm mt-4 text-center dark:text-violet">
                  Tell us about your education
                </p>
            </div>
          )}
          {tabValue === "3" && (
            <div className="flex flex-col my-auto justify-center items-center h-full p-4">
              <p className="text-3xl mb-12 text-veryDarkBlue dark:text-violet">Work Experience</p>
              <div className="relative">
                <Image
                  src="/assets/desktop/work.svg"
                  height={300}
                  width={300}
                  alt="work-experience"
                />
              </div>
              <p className="text-sm mt-4 text-center dark:text-violet">
                  Tell us about your latest work experience
                </p>
            </div>
          )}
          {tabValue === "4" && (
            <div className="flex flex-col my-auto justify-center items-center h-full p-4">
              <p className="text-3xl mb-12 text-veryDarkBlue dark:text-violet">Application</p>
              <div className="relative">
                <Image
                  src="/assets/desktop/application.svg"
                  height={200}
                  width={200}
                  alt="application"
                />
              </div>
              <p className="text-sm mt-4 text-center dark:text-violet">
                  Write about your skills
                </p>
            </div>
          )}
        </div>
        <div className={"max-w-[650px] flex-grow m-auto " + (width < 991 && "w-[90%]")}>
          <div className={"flex m-auto shadow-black-white dark:shadow-blue-border justify-between py-2 px-4 " + (width < 991 ? "w-[90%] mt-6" : "w-[70%]")}>
              <span
                onClick={() => setValue("selectedTab", "1")}
                className={
                  "cursor-pointer m-auto flex justify-center items-center " +
                  (tabValue === "1"
                    ? "font-bold shadow-black-white-inset dark:shadow-none min-w-[70px] mx-auto dark:border-[1px] dark:border-violet dark:rounded-full dark:p-4 "
                    : "font-medium")
                }
              >
                <Icon
                  path={mdiCardAccountDetailsOutline}
                  size={1.5}
                  className="text-darkBlue"
                />
              </span>

              <span
                onClick={() => setValue("selectedTab", "2")}
                className={
                  "cursor-pointer m-auto flex justify-center items-center " +
                  (tabValue === "2"
                    ? "font-bold shadow-black-white-inset dark:shadow-none min-w-[70px] mx-auto dark:border-[1px] dark:border-violet dark:rounded-full dark:p-4"
                    : "font-medium")
                }
              >
                <Icon
                  path={mdiBookEducationOutline}
                  size={1.5}
                  className="text-darkBlue"
                />
              </span>
              <span
                onClick={() => setValue("selectedTab", "3")}
                className={
                  "cursor-pointer m-auto flex justify-center items-center " +
                  (tabValue === "3"
                    ? "font-bold shadow-black-white-inset dark:shadow-none min-w-[70px] mx-auto dark:border-[1px] dark:border-violet dark:rounded-full dark:p-4"
                    : "font-medium")
                }
              >
                <Icon
                  path={mdiBriefcaseOutline}
                  size={1.5}
                  className="text-darkBlue"
                />
              </span>
              <span
                onClick={() => setValue("selectedTab", "4")}
                className={
                  "cursor-pointer m-auto flex justify-center items-center " +
                  (tabValue === "4"
                    ? "font-bold shadow-black-white-inset dark:shadow-none min-w-[70px] mx-auto dark:border-[1px] dark:border-violet dark:rounded-full dark:p-4"
                    : "font-medium")
                }
              >
                <Icon
                  path={mdiApplicationEditOutline}
                  size={1.5}
                  className="text-darkBlue"
                />
              </span>
          </div>
          <div className="min-h-[600px]">
            <form
              className="w-full mt-8 px-4"
              onSubmit={handleSubmit(submitProfile, (e) =>
                console.log("error", e)
              )}
            >
              {tabValue === "1" && (
                <div className="flex items-start flex-col">
                  <label className="block text-lightBlue mb-2 ">Full name</label>
                  <input
                    className="w-full p-4 rounded-[5px] focus:border-1 focus:border-veryLightBlue outline-none bg-btnVeryLight"
                    {...register("personalDetails.name", { required: true })}
                  />
                  <p className="text-warning mt-2">
                    {errors.personalDetails?.name?.message}
                  </p>
                  <label className="block text-lightBlue mb-2">Email</label>
                  <input
                    className="w-full p-4 rounded-[5px] focus:border-1 focus:border-veryLightBlue outline-none bg-btnVeryLight"
                    {...register("personalDetails.email", { required: true })}
                  />
                  <p className="text-warning mt-2">
                    {errors.personalDetails?.email?.message}
                  </p>
                  <label className="block text-lightBlue mb-2 mt-2">
                    Location
                  </label>
                  <Combobox
                    onSelect={handleLocationSelect}
                    aria-labelledby="demo"
                    className="w-full"
                  >
                    <ComboboxInput
                      className="w-full p-4 rounded-[5px] focus:border-1 focus:border-veryLightBlue outline-none bg-btnVeryLight"
                      value={value}
                      onChange={handleLocationInput}
                      disabled={!ready}
                    />
                    <ComboboxPopover className="bg-lightGrey px-4 shadow-xl">
                      <ComboboxList>
                        {status === "OK" &&
                          data.map(({ place_id, description }) => (
                            <ComboboxOption
                              key={place_id}
                              value={description}
                              className="mt-3"
                            />
                          ))}
                      </ComboboxList>
                    </ComboboxPopover>
                  </Combobox>
                  <p className="text-warning mt-2">
                    {errors.personalDetails?.location?.message}
                  </p>
                  <div className="flex lg:flex-row mt-4 mb-4 justify-between md:flex-nowrap sm:flex-wrap w-full sm:items-start">
                    <div className="flex lg:mb-0 items-center sm:mb-8">
                      <label htmlFor="role" className="text-lightBlue mr-4">
                        Role
                      </label>
                      <select
                        id="role"
                        className="p-4 rounded-[5px] focus:border-veryLightBlue outline-none bg-btnVeryLight sm:w-full lg:w-auto"
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
                        className="p-4 rounded-[5px] focus:border-veryLightBlue outline-none bg-btnVeryLight"
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
                    className="block text-lightBlue mb-2 mt-2"
                  >
                    Social Profile
                  </label>
                  <input
                    id="socialProfile"
                    className="w-full p-4 rounded-[5px] focus:border-1 focus:border-veryLightBlue outline-none bg-btnVeryLight"
                    {...register("personalDetails.socialProfile")}
                  />
                  <p className="text-warning mt-2">
                    {errors.personalDetails?.socialProfile?.message}
                  </p>

                  <button
                    onClick={async () => {
                      await trigger("personalDetails");
                    }}
                    className={"py-3 px-8 mt-8 transition ease-in-out delay-150 bg-lightBlue hover:-translate-y-1 hover:scale-110 hover:bg-darkBlue duration-300 text-white rounded-[5px] " + (width < 991 ? "mx-auto mb-4 w-[90%]" : "ml-auto")}
                  >
                    Next
                  </button>
                </div>
              )}
              {tabValue === "2" && (
                <div className="flex items-start flex-col">
                  <label className="block text-lightBlue mb-2">
                    College / University
                  </label>
                  <input
                    className="w-full p-4 rounded-[5px] focus:border-1 focus:border-veryLightBlue outline-none bg-btnVeryLight"
                    {...register("education.college")}
                  />
                  <p className="text-warning mt-2">
                    {errors.education?.college?.message}
                  </p>
                  <label className="block text-lightBlue mb-2">
                    Graduated on
                  </label>
                  <input
                    type="date"
                    className="w-full p-4 rounded-[5px] focus:border-1 focus:border-veryLightBlue outline-none bg-btnVeryLight"
                    {...register("education.graduationDate", {
                      valueAsDate: true,
                    })}
                  />
                  <p className="text-warning mt-2">
                    {errors.education?.graduationDate?.message}
                  </p>
                  <div className="flex lg:flex-row items-center mt-2 flex-wrap w-full">
                    <label htmlFor="degree" className="text-lightBlue mr-4 mb-2">
                      Degree
                    </label>
                    <select
                      id="degree"
                      className="flex-grow p-4 rounded-[5px] focus:border-1 focus:border-veryLightBlue outline-none bg-btnVeryLight w-full"
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
                  <label className="block text-lightBlue mb-2 mt-2">
                    Major
                  </label>
                  <input
                    className="w-full p-4 rounded-[5px] focus:border-1 focus:border-veryLightBlue outline-none bg-btnVeryLight"
                    {...register("education.major")}
                  />
                  <p className="text-warning mt-2">
                    {errors.education?.major?.message}
                  </p>
                  <label className="block text-lightBlue mb-2">
                    Score (GPA)
                  </label>
                  <input
                    type="number"
                    className="p-4 appearance-none w-full rounded-[5px] focus:border-1 focus:border-veryLightBlue outline-none bg-btnVeryLight"
                    {...register("education.gpa", {
                      valueAsNumber: true,
                    })}
                  />
                  <p className="text-warning mt-2">
                    {errors.education?.gpa?.message}
                  </p>
                  <button
                    type="submit"
                    className={"py-3 px-8 mt-8 transition ease-in-out delay-150 bg-lightBlue hover:-translate-y-1 hover:scale-110 hover:bg-darkBlue duration-300 text-white rounded-[5px] " + (width < 991 ? "mx-auto mb-4 w-[90%]" : "ml-auto")}
                    
                  >
                    Next
                  </button>
                </div>
              )}
              {tabValue === "3" && (
                <div className="flex items-start flex-col">
                  <label className="block text-lightBlue mb-2">Company</label>
                  <input
                    className="w-full p-4 rounded-[5px] focus:border-1 focus:border-veryLightBlue outline-none bg-btnVeryLight"
                    {...register("experience.company")}
                  />
                  <p className="text-warning mt-2">
                    {errors.experience?.company?.message}
                  </p>
                  <label className="block text-lightBlue mb-2">
                    Position
                  </label>
                  <input
                    className="w-full p-4 rounded-[5px] focus:border-1 focus:border-veryLightBlue outline-none bg-btnVeryLight"
                    {...register("experience.position")}
                  />
                  <p className="text-warning mt-2">
                    {errors.experience?.position?.message}
                  </p>
                  <div className="flex items-center justify-between w-full flex-wrap">
                  <div className={"animate-fadeIn flex " + (width < 991 ? "mt-2 flex-col items-start w-full" : "items-center flex-row mt-4")}>
                      <label
                        htmlFor="startDate"
                        className="text-lightBlue mr-4 whitespace-nowrap mb-2"
                      >
                        Started On
                      </label>
                      <input
                        type="date"
                        id="startDate"
                        onClick={(e) => e.currentTarget.showPicker()}
                        className="w-full p-4 rounded-[5px] focus:border-1 focus:border-veryLightBlue outline-none bg-btnVeryLight"
                        {...register("experience.startDate", {
                        })}
                      />
                      <p className="text-warning mt-2">
                        {errors.experience?.startDate?.message}
                      </p>
                    </div>
                    {!watch("experience").stillWorking && (
                      <div className={"animate-fadeIn flex " + (width < 991 ? "mt-2 flex-col items-start w-full" : "items-center flex-row")}>
                        <label className="text-lightBlue mr-4 whitespace-nowrap mb-2">
                          Last Date
                        </label>
                        <input
                          type="date"
                          className="w-full p-4 rounded-[5px] focus:border-1 focus:border-veryLightBlue outline-none bg-btnVeryLight"
                          {...register("experience.endDate", {
                          })}
                          onClick={(e) => e.currentTarget.showPicker()}
                        />
                        <p className="text-warning mt-2">
                          {errors.experience?.endDate?.message}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-nowrap items-center mt-4">
                    <input
                      type="checkbox"
                      id="stillWorking"
                      {...register("experience.stillWorking")}
                    />
                    <label className="block text-lightBlue ml-4 cursor-pointer" htmlFor="stillWorking">
                      I am still working here
                    </label>
                  </div>
                  <label className="block text-lightBlue mb-2 mt-8">
                    Describe Your Role
                  </label>
                  <textarea
                    className="p-4 appearance-none w-full rounded-[5px] focus:border-1 focus:border-veryLightBlue outline-none bg-btnVeryLight"
                    {...register("experience.jobDescription")}
                  />
                  <p className="text-warning mt-2">
                    {errors.experience?.jobDescription?.message}
                  </p>
                  <button
                    type="submit"
                    className={"py-3 px-8 mt-8 transition ease-in-out delay-150 bg-lightBlue hover:-translate-y-1 hover:scale-110 hover:bg-darkBlue duration-300 text-white rounded-[5px] " + (width < 991 ? "mx-auto mb-4 w-[90%]" : "ml-auto")}
                  >
                    Next
                  </button>
                </div>
              )}
              {tabValue === "4" && (
                <div className="flex items-start flex-col">
                  <label htmlFor="skills" className="block text-lightBlue mb-2">
                    Your Skills
                  </label>
                  <div className="grid lg:grid-cols-[repeat(4,_auto)] sm:grid-cols-[repeat(3,_auto)] gap-3 w-full justify-stretch  ">
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
                    className="mt-4 p-4 rounded-[5px] focus:border-1 bg-btnVeryLight w-full"
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
                        getValues().application?.skills[currentIdx]?.skill !==
                          ""
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
                    className="min-h-[10rem] p-4 appearance-none w-full rounded-[5px] focus:border-1 focus:border-veryLightBlue outline-none bg-btnVeryLight"
                    {...register("application.coverLetter")}
                  />
                  <p className="text-warning mt-2">
                    {errors.application?.coverLetter?.message}
                  </p>

                  <button
                    type="submit"
                    className={"py-3 px-8 mt-8 transition ease-in-out delay-150 bg-lightBlue hover:-translate-y-1 hover:scale-110 hover:bg-darkBlue duration-300 text-white rounded-[5px] " + (width < 991 ? "mx-auto mb-4 w-[90%]" : "ml-auto")}
                  >
                    Next
                  </button>
                </div>
              )}
            </form>
          </div>
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
