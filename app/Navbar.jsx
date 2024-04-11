"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import useWindowSize from "@/utilities/hooks/useWindowSize";
import ProfileMob from "./(navProfile)/ProfileMob";
import ProfileWeb from "./(navProfile)/ProfileWeb";


export default function Navbar() {
    const { data: session } = useSession();
    const router = useRouter();
    const [windowWidth, _] = useWindowSize();

    const login = () => {
        router.push('/login');
    }

    const signout = () => {
        signOut({ callbackUrl: '/' });
    }

    const profileProps = {
        login,
        signout,
        session,
    }

    return (<nav className="bg-lightBlue lg:rounded-bl-100 md:rounded-bl-100 sm:rounded-none bg-no-repeat nav-bg md:pt-3 md:pb-4 lg:pt-4 lg:pb-8">
        <div className='flex item-center justify-between lg:max-w-[85%] max-w-full mx-auto lg:px-24 md:px-8 sm:px-8 sm:py-6 '>
            <Link href="/" className="sm:max-w-[8rem]">
                <Image src="https://devjobs-fs.s3.ap-south-1.amazonaws.com/assets/logos/devjobs.svg" width={200} height={200} className='py-4' alt="logo" />
            </Link>
            {windowWidth > 645 ? <ProfileWeb {...profileProps} /> : <ProfileMob {...profileProps} />}
        </div>
    </nav>)
}