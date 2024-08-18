"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Error({ error }) {
  const router = useRouter();

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center flex-col lg:max-w-[50%] sm:max-w-auto sm:px-8 mx-auto relative overflow-auto">
      <div>
        <div>
          <span className="text-[15rem] font-bold text-darkGrey">4</span>
          <span className="text-[15rem] text-veryLightGrey font-bold">0</span>
          <span className="text-[15rem] font-bold text-darkGrey">1</span>
        </div>
      </div>
      <p className="text-darkBlue font-medium text-3xl mb-4">
        {error.message || "Something is wrong!"}
      </p>
      <p className="text-darkGrey text-xl">...maybe you could try logging in again or go back to the home page</p>
      <button
        className="bg-lightBlue text-white py-3 px-9 rounded-[6px] font-bold font-xl mx-auto mt-6 hover:bg-btnDarkHover hover-transition"
        onClick={() => router.push("/")}
      >
        <div className="flex gap-3">
          <p>Go Back</p>
          <Image
            src="/assets/desktop/arrow.svg"
            height={20}
            width={40}
            alt="arrow"
          />
        </div>
      </button>
    </div>
  );
}
