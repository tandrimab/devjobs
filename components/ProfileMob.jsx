import Switch from "@/components/Switch";
import { mdiMenu } from "@mdi/js";
import Icon from "@mdi/react";
import Image from "next/image";
import Link from "next/link";

export default function ProfileMob({ session, login, signout }) {
    return (
        <div className="group relative flex items-center ml-6 ">
            <Icon
                path={mdiMenu}
                size="2rem"
                className="text-white cursor-pointer"
            />

            <div className="absolute top-[50px] right-[5px] hidden group-hover:block bg-btnDarkHover rounded-[12px] z-[999] text-white min-w-[300px]">
                {session ? <div className="px-6 py-4 flex items-center border-b-veryLightBlue border-b ">
                    <img src={session?.image} className="rounded-full max-w-[30px] max-h-[30px] mr-4" referrerPolicy="no-referrer" />
                    <div>
                        <p className="font-bold">{session?.name}</p>
                        <p className="font-medium">{session?.email}</p>
                    </div>
                    <Link href="/appliedCompanies" className="px-6 py-4 font-medium w-full text-left">Applied Companies</Link>
                </div> : null}
                <div className="flex item-center ml-auto my-auto px-6 py-4 justify-between">
                    <p>Theme</p>
                    <div className="flex shrink-0">
                        <Image src="/assets/desktop/icon-sun.svg" height={24} width={24} className="md:mr-6 sm:mr-4" alt="icon" />
                        <Switch />
                        <Image src="/assets/desktop/icon-moon.svg" height={24} width={24} className="md:ml-6 sm:ml-4" alt="icon" />
                    </div>
                </div>
                <div>
                    {session ?
                        <button className="px-6 py-4 font-medium w-full text-left" onClick={signout}>Logout</button> :
                        <button className="px-6 py-4 font-medium w-full text-left" onClick={login}>Login</button>}
                </div>

            </div>

        </div>
    )
}