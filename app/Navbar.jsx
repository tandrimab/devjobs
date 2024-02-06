"use client"
import Switch from "@/components/Switch";
import Image from "next/image";
import Link from "next/link";


export default function Navbar() {
    return (<nav className="bg-lightBlue lg:rounded-bl-100 md:rounded-bl-100 sm:rounded-none bg-no-repeat nav-bg md:pt-3 md:pb-4 lg:pt-4 lg:pb-8">
        <div className='flex item-center justify-between lg:max-w-[85%] max-w-full mx-auto lg:px-24 md:px-8 sm:px-8 sm:py-6 '>
            <Link href="/" className="sm:max-w-[8rem]">
                <Image src="/assets/logos/devjobs.svg" width={200} height={200} className='py-4' alt="logo" />
            </Link>
            <div className="flex item-center h-max ml-auto my-auto z-[999]">
                <Image src="/assets/desktop/icon-sun.svg" height={24} width={24} className="mr-10" alt="icon" />
                <Switch />
                <Image src="/assets/desktop/icon-moon.svg" height={24} width={24} className="ml-10" alt="icon" />
            </div>
        </div>
    </nav>)
}