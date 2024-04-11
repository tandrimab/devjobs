'use client'
import Modal from "@/components/Modal";
import Icon from '@mdi/react';
import { mdiGithub, mdiGoogle, mdiMicrosoftOutlook } from '@mdi/js';
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";


export default function LoginPage({ }) {
    const { data: session } = useSession();
    const authenticateUser = () => {
        signIn();
        if (session) {
            console.log(session);
        }
    }
    return (
        <Modal modalClassName='backdrop-blur-xl backdrop-contrast-50 bg-black/60' bodyClassName="sm:w-9/12 md:w-8/12 lg:w-4/12 rounded-[6px]">
            <div className="flex flex-col items-center bg-gradient-to-r from-grey to-lightGrey">
                <div className="bg-lightBlue pt-8 pb-8 rounded-bl-100 bg-no-repeat nav-bg w-full pl-8 bg-1/2 modal-nav-bg">
                    <Image src="https://devjobs-fs.s3.ap-south-1.amazonaws.com/assets/logos/devjobs.svg" width={150} height={150} className='py-4' alt="logo" />
                </div>
                <div className="w-10/12 flex items-center flex-col py-10">
                    <div className="rounded-[6px] md:px-4 flex flex-row max-w-8/12 mx-auto border-[2px] border-[#9e7f66] justify-center items-center cursor-pointer shadow hover:shadow-xl my-5">
                        <Icon path={mdiGithub} size='2.5rem' />
                        <button onClick={() => signIn('github')} className="text-xl font-medium p-4 shrink-0">
                            Signin with Github
                        </button>
                    </div>
                    <div className="rounded-[6px] md:px-4 flex flex-row max-w-8/12 mx-auto border-[2px] border-[#9e7f66] justify-center items-center cursor-pointer my-5 shadow hover:shadow-xl">
                        <Icon path={mdiGoogle} size='2.5rem' />
                        <button onClick={() => signIn('google')} className="text-xl font-medium p-4 shrink-0">
                            Signin with Google
                        </button>
                    </div>
                    <div className="rounded-[6px] md:px-4 flex flex-row max-w-8/12 mx-auto border-[2px] border-[#9e7f66] justify-center items-center cursor-pointer my-5 shadow hover:shadow-xl">
                        <Icon path={mdiMicrosoftOutlook} size='2.5rem' />
                        <button onClick={() => signIn('azure-ad')} className="text-xl font-medium p-4 shrink-0">
                            Signin with Outlook
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}