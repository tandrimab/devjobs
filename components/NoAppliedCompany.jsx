'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NoAppliedCompany(props) {
    const router = useRouter();

    return  <div className=" min-h-screen flex items-center justify-center mt-[-4rem] flex-col lg:max-w-[80%] sm:max-w-auto sm:px-8 mx-auto relative overflow-auto">
    <div className="mb-12">
      <Image
        src="/assets/desktop/unauthorized.svg"
        height={400}
        width={400}
        alt="unauthorized"
      />
    </div>
    <p className="text-darkBlue font-medium text-3xl mb-8">
        {props.mainText}
    </p>
    <p className="text-darkGrey text-xl">
      {props.text}
    </p>
    <button
      className="bg-lightBlue text-white py-3 px-9 rounded-[6px] font-bold font-xl mx-auto mt-6 hover:bg-btnDarkHover hover-transition"
      onClick={() => router.push(props.redirectUrl)}
    >
      {props.btnText}
    </button>
  </div>
}