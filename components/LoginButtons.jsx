'use client'
import Icon from '@mdi/react';
import { mdiGithub, mdiGoogle, mdiMicrosoftOutlook } from '@mdi/js';
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { usePathStore } from '@/app/store/store';
import AnimatedLogo from './AnimatedLogo';

export default function LoginButtons() {
    const { data: session } = useSession();
    const router  = useRouter();
    const { prevPath } = usePathStore()    

    useEffect(() => {
        if (session?.user) {
            router.push(prevPath);
        }
    }, [session, router])


    return (
        <div className="max-w-[80%] rounded-[12px] md:ml-auto sm:mx-auto animate-scaleRight bg-white shadow-lg"
        // style={{backgroundImage: 'linear-gradient(315deg, rgba(43,60,60,1) 0%, rgba(45,103,120,1) 40%, rgba(45,107,126,1) 58%, rgba(33,47,74,1) 100%, rgba(7,2,17,1) 100%)'}}
        >
            <AnimatedLogo />
            <div className="flex flex-col items-center">
                
                <div className="w-10/12 flex items-center flex-col py-10 px-10">
                    <div className="rounded-[6px] md:px-4 flex flex-row max-w-8/12 mx-auto border-[2px] border-[#9e7f66] justify-center items-center cursor-pointer shadow hover:shadow-xl my-5">
                        <Icon path={mdiGithub} size='2.5rem' />
                        <button onClick={() => signIn('github')} className="text-base text-darkBlue font-medium py-2 px-8 shrink-0">
                            Signin with Github
                        </button>
                    </div>
                    <div className="rounded-[6px] md:px-4 flex flex-row max-w-8/12 mx-auto border-[2px] border-[#9e7f66] justify-center items-center cursor-pointer my-5 shadow hover:shadow-xl">
                        <Icon path={mdiGoogle} size='2.5rem' />
                        <button onClick={() => 
                            signIn('google')} className="text-base text-darkBlue font-medium py-2 px-8 shrink-0">
                            Signin with Google
                        </button>
                    </div>
                    <div className="rounded-[6px] md:px-4 flex flex-row max-w-8/12 mx-auto border-[2px] border-[#9e7f66] justify-center items-center cursor-pointer my-5 shadow hover:shadow-xl">
                        <Icon path={mdiMicrosoftOutlook} size='2.5rem' />
                        <button onClick={() => 
                            signIn(
                                'azure-ad',
                                { callbackUrl: '/' })} className="text-base font-medium py-2 px-8 shrink-0 text-darkBlue">
                            Signin with Outlook
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}