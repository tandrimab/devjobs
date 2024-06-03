"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function GoBackClientComponent() {
  const router = useRouter();

  return (
    <button className="bg-lightBlue text-white py-3 px-9 rounded-[6px] font-bold font-xl mx-auto mt-6 hover:bg-btnDarkHover hover-transition" onClick={() => router.back()}>
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
  );
}
