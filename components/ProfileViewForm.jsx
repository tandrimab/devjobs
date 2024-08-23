"use client";
import Link from "next/link";
import { mdiPencilCircle } from "@mdi/js";
import Icon from "@mdi/react";
import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";

export default function ProfileViewForm({ defaultValues }) {
  const { register, getValues } = useForm({
    defaultValues: defaultValues,
  });

  const skills = getValues().application?.skills;

  const experienceRef = useRef();

  return (
    <div className=" min-h-screen lg:max-w-[50%] md:max-w-[80%] max-w-full md:px-8 md:py-4 sm:px-8 sm:py-3 mx-auto lg:mt-[-3rem] md:mt-[-3rem] sm:mt-[-2rem] relative bg-white dark:bg-midnight">
      <div className="flex flex-col justify-between">
        <section className="flex flex-col relative border border-lightBlue px-8 pb-14 mt-10">
          <div className="block pl-4 align-middle text-darkrey no-underline hover:text-lightViolet">
            <span className="absolute top-[-15px] bg-white border border-lightBlue p-1 text-lightBlue dark:bg-veryDarkBlue">
              Personal Details
            </span>
          </div>

          <div className="flex items-start flex-col">
            <Link
              href={"/profile/edit"}
              className="py-3 px-8 mt-4 ml-auto rounded-[5px]"
            >
              <Icon
                path={mdiPencilCircle}
                size={1.5}
                className=" transition ease-in-out delay-150 text-lightBlue hover:-translate-y-1 hover:scale-110 hover:text-darkBlue duration-300"
              />
            </Link>
            <label className="block text-lightBlue mb-2">Full name</label>
            <input
              className="w-full p-2 rounded-[5px] shadow-md outline-none"
              readOnly
              {...register("personalDetails.name")}
            />
            <label className="block text-lightBlue mb-2 mt-8">Email</label>
            <input
              className="w-full p-2 rounded-[5px] shadow-md outline-none"
              readOnly
              {...register("personalDetails.email")}
            />
            <label className="block text-lightBlue mb-2 mt-8">Location</label>
            <input
              className="w-full p-2 rounded-[5px] shadow-md outline-none"
              readOnly
              {...register("personalDetails.location")}
            />
            <div className="flex lg:flex-row mt-8 justify-between flex-wrap w-full sm:items-start">
              <div className="flex flex-col lg:mb-0 items-start sm:mb-8 grow md:mr-8 sm:mr-0">
                <label htmlFor="role" className="text-lightBlue md:mr-4 block sm:mb-2">
                  Role
                </label>
                <input
                  className="w-full p-2 rounded-[5px] shadow-md outline-none"
                  readOnly
                  {...register("personalDetails.role")}
                />
              </div>
              <div className="flex flex-col items-start grow ">
                <label
                  htmlFor="experience"
                  className="block text-lightBlue md:mr-4 sm:mb-2"
                >
                  Years of Experience
                </label>
                <input
                  className="w-full p-2 rounded-[5px] shadow-md outline-none"
                  readOnly
                  {...register("personalDetails.experience")}
                />
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
              className="w-full p-2 rounded-[5px] shadow-md outline-none"
              readOnly
              {...register("personalDetails.socialProfile")}
            />
          </div>
        </section>
        <section className="flex flex-col relative border border-lightBlue px-8 pb-14 mt-14">
          <div className="block pl-4 align-middle text-darkrey no-underline hover:text-lightViolet">
            <span className="absolute top-[-15px] bg-white border border-lightBlue p-1 text-lightBlue dark:bg-veryDarkBlue">
              Education
            </span>
          </div>

          <div className="flex items-start flex-col">
            <Link
              href={"/profile/edit"}
              className="py-3 px-8 mt-4 ml-auto rounded-[5px]"
            >
              <Icon
                path={mdiPencilCircle}
                size={1.5}
                className=" transition ease-in-out delay-150 text-lightBlue hover:-translate-y-1 hover:scale-110 hover:text-darkBlue duration-300"
              />
            </Link>
            <label className="block text-lightBlue mb-2">
              College / University
            </label>
            <input
              className="w-full p-2 rounded-[5px] shadow-md outline-none"
              readOnly
              {...register("education.college")}
            />
            <label className="block text-lightBlue mb-2 mt-8">
              Graduated on
            </label>
            <input
              className="w-full p-2 rounded-[5px] shadow-md outline-none"
              readOnly
              {...register("education.graduationDate")}
            />
            <div className="flex lg:flex-row items-start mt-8 flex-wrap w-full">
              <label htmlFor="degree" className="text-lightBlue mr-4">
                Degree
              </label>
              <input
                className="w-full p-2 rounded-[5px] shadow-md outline-none"
                readOnly
                {...register("education.degree")}
              />
            </div>
            <label className="block text-lightBlue mb-2 mt-8">Major</label>
            <input
              className="w-full p-2 rounded-[5px] shadow-md outline-none"
              readOnly
              {...register("education.major")}
            />
            <label className="block text-lightBlue mb-2 mt-8">
              Score (GPA)
            </label>
            <input
              className="p-2 appearance-none w-full p-2 rounded-[5px] shadow-md outline-none"
              readOnly
              {...register("education.gpa")}
            />
          </div>
        </section>
        <section className="flex flex-col relative border border-lightBlue px-8 pb-14 mt-14" ref={experienceRef}>
          <div className="block pl-4 align-middle text-darkrey no-underline hover:text-lightViolet">
            <span className="absolute top-[-15px] bg-white border border-lightBlue p-1 text-lightBlue dark:bg-veryDarkBlue">
              Work Experience
            </span>
          </div>

          <div className="flex items-start flex-col">
            <Link
              href={"/profile/edit"}
              className="py-3 px-8 mt-4 ml-auto rounded-[5px]"
            >
              <Icon
                path={mdiPencilCircle}
                size={1.5}
                className=" transition ease-in-out delay-150 text-lightBlue hover:-translate-y-1 hover:scale-110 hover:text-darkBlue duration-300"
              />
            </Link>
            <label className="block text-lightBlue mb-2">Company</label>
            <input
              className="w-full p-2 rounded-[5px] shadow-md outline-none"
              readOnly
              {...register("experience.company")}
            />
            <label className="block text-lightBlue mb-2 mt-8">Position</label>
            <input
              className="w-full p-2 rounded-[5px] shadow-md outline-none"
              readOnly
              {...register("experience.position")}
            />
            <div className="flex lg:flex-row mt-8 justify-between flex-wrap w-full sm:items-start">
              <div className="flex flex-col lg:mb-0 items-start sm:mb-8 grow mr-8">
                <label htmlFor="role" className="text-lightBlue mr-4 mb-2">
                  Started On
                </label>
                <input
                  className="w-full p-2 rounded-[5px] shadow-md outline-none"
                  readOnly
                  {...register("experience.startDate")}
                />
              </div>
              <div className="flex flex-col items-start grow ">
                <label
                  htmlFor="experience"
                  className="block text-lightBlue mr-4 mb-2"
                >
                  Last Date
                </label>
                <input
                  className="w-full p-2 rounded-[5px] shadow-md outline-none"
                  readOnly
                  {...register("experience.endDate")}
                />
              </div>
            </div>
            <label className="block text-lightBlue mb-2 mt-8">About Role</label>
            <input
              className="w-full p-2 rounded-[5px] shadow-md outline-none"
              readOnly
              {...register("experience.jobDescription")}
            />
          </div>
        </section>
        <section className="flex flex-col relative border border-lightBlue px-8 pb-14 mt-14 mb-10">
          <div className="block pl-4 align-middle text-darkrey no-underline hover:text-lightViolet">
            <span className="absolute top-[-15px] bg-white border border-lightBlue p-1 text-lightBlue dark:bg-veryDarkBlue">
              Application
            </span>
          </div>

          <div className="flex items-start flex-col">
            <Link
              href={"/profile/edit"}
              className="py-3 px-8 mt-4 ml-auto rounded-[5px]"
            >
              <Icon
                path={mdiPencilCircle}
                size={1.5}
                className=" transition ease-in-out delay-150 text-lightBlue hover:-translate-y-1 hover:scale-110 hover:text-darkBlue duration-300"
              />
            </Link>
            <label className="block text-lightBlue mb-2">Skills</label>

            <div className="grid lg:grid-cols-[repeat(4,_auto)] sm:grid-cols-[repeat(3,_auto)] gap-3 w-full justify-stretch  ">
              {skills.length ? skills.map(
                (skill, index) =>
                  skill.skill !== "" && (
                    <div
                      className="flex flex-nowrap px-4 py-2 border-lightBlue border"
                      key={skill.id}
                    >
                      <label key={skill.id}>
                        <p className="text-lightBlue text-sm">{skill.skill}</p>
                      </label>
                    </div>
                  )
              ) : null}
            </div>

            <label className="block text-lightBlue mb-2 mt-8">
              Cover Letter
            </label>
            <input
              className="w-full p-2 rounded-[5px] shadow-md outline-none"
              readOnly
              {...register("application.coverLetter")}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
