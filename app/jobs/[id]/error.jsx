'use client'
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function Error({}) {
    const router = useRouter();
    return(
        <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center flex-col lg:max-w-[50%] sm:max-w-auto md:px-8 mx-auto relative overflow-auto">
            <div>
                <span className="text-[15rem] font-bold text-darkGrey">4</span>
                <span className="text-[15rem] text-veryLightGrey font-bold">0</span>
                <span className="text-[15rem] font-bold text-darkGrey">4</span>
            </div>
            <p className="text-[5rem] text-darkBlue font-medium mb-4">There is nothing here...</p>
            <p className="text-darkGrey text-xl">...maybe the job you're looking for is not listed yet or never existed</p>
            <button className="bg-lightBlue text-white py-3 px-9 rounded-[6px] font-bold font-xl mx-auto mt-6 hover:bg-btnDarkHover"
            onClick={() => router.push('/')}
            >
                <div className="flex gap-3">
                    <p>Go Back</p>
                    <Image src="/assets/desktop/arrow.svg" height={20} width={40} alt="arrow"/></div>
                </button>
        </div>
    )
}