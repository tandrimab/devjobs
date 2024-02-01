"use client"
import Switch from "@/components/Switch";
import Image from "next/image";
import Link from "next/link";


export default function Navbar() {
    return (<nav className="bg-lightBlue pt-8 pb-14 rounded-bl-100 bg-no-repeat nav-bg">
        <div className='flex item-center justify-between max-w-[80%] mx-auto px-24 '>
            <Link href="/">
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