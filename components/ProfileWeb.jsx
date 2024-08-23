import Switch from "@/components/Switch";
import { mdiAccountCircle } from "@mdi/js";
import Icon from "@mdi/react";
import Image from "next/image";
import Link from "next/link";

export default function ProfileWeb({ session, login, signout }) {
    return (
        <>
            <div className="flex item-center h-max ml-auto my-auto z-[998]">
                <Image src="/assets/desktop/icon-sun.svg" height={24} width={24} className="md:mr-6 sm:mr-4" alt="icon" />
                <Switch />
                <Image src="/assets/desktop/icon-moon.svg" height={24} width={24} className="md:ml-6 sm:ml-4" alt="icon" />
            </div>
            {session ?
                <div className="relative flex items-center ml-6 group">
                    <Icon
                        path={mdiAccountCircle}
                        size="2rem"
                        className="text-white cursor-pointer"
                    />
                    <div className="absolute top-[50px] right-[5px] hidden group-hover:block bg-btnDarkHover rounded-[12px] z-[999] text-white min-w-[300px]">
                        <div className="px-6 py-4 flex items-center border-b-veryLightBlue border-b">
                            <Image height={30} width={30}
                            src={session?.image} className="rounded-full max-w-[30px] max-h-[30px] mr-4" referrerPolicy="no-referrer" alt="user-image" />
                            <div>
                                <p className="font-bold">{session?.name}</p>
                                <p className="font-medium">{session?.email}</p>
                            </div>

                        </div>
                        <Link href="/appliedCompanies" className="px-6 py-4 font-medium w-full text-left">Applied Companies</Link>
                        <div>
                            <button className="px-6 py-4 font-medium w-full text-left" onClick={signout}>Logout</button>
                        </div>
                    </div>
                </div> :
                <div
                    className="z-[999] rounded-[6px] text-lightBlue relative ml-10 py-4 px-10 font-bold my-auto cursor-pointer flex items-center before:bg-gradient-to-r from-white to-darkGrey before:h-[100%] bg-white hover:bg-veryLightBlue hover:text-white before:w-[140%] before:absolute overflow-hidden bg-veryDarkBlue after:rounded-[6px] after:content-[''] after:absolute after:inset-[5px] after:bg-lightBlue before:inset-[0] before:animate-btnAnimated before:rounded-[6px] before:hidden after:hidden hover:before:block hover:after:block flex justify-center"
                    onClick={login}
                >
                    <p className="z-[999]">Login</p>
                </div>
            }
        </>
    )
}