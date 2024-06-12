'use client'
import Modal from "@/components/Modal";
import Icon from '@mdi/react';
import { mdiGithub, mdiGoogle, mdiMicrosoftOutlook } from '@mdi/js';
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { usePathStore } from "../store/store";
import WelcomePage from "@/components/WelcomePage";
import Carousel from "@/components/Carousel";

const carousel = [
    {
        src: '/assets/desktop/astronaut-2.jpg',
        text: "Sky is not the limit. Fly high and launch your career like an astronaut"
    },
    {
        src: '/assets/desktop/home-office.jpg',
        text: "Feel homely, feel comfortable. Work remotely"
    },
    {
        src: '/assets/desktop/office.jpg',
        text: "hjhjhkjk"
    },
]

export default function LoginPage({ }) {
    const { data: session } = useSession();
    const router  = useRouter();
    const { prevPath } = usePathStore()    

    useEffect(() => {
        if (session?.user) {
            router.push(prevPath);
        }
    }, [session, router])

    return (
        <div className="relative">
            <WelcomePage
                items={carousel}
                bg="/assets/desktop/work-setup-1.jpg"
            />
            <div>
                {/*here shoul be the modal with login options */}
            </div>
        </div>
    )
}