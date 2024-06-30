"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { usePathStore } from "../store/store";
import WelcomePage from "@/components/WelcomePage";
import DotsLoader from "@/components/DotsLoader";

const carousel = [
  {
    src: "/assets/desktop/astronaut.jpg",
    text: "Sky is not the limit. Fly high and launch your career like an astronaut",
  },
  {
    src: "/assets/desktop/home-office.jpg",
    text: "Feel homely, feel comfortable. Work remotely",
  },
  {
    src: "/assets/desktop/office.jpg",
    text: "Take your first step into this journey. Signup to continue",
  },
];

export default function LoginPage({}) {
  const { data: session } = useSession();
  const router = useRouter();
  const { prevPath } = usePathStore();

  useEffect(() => {
    if (session?.user) {
      router.push(prevPath);
    }
  }, [session, router]);

  return (
    <div className="relative">
      {session?.user ? (
        <DotsLoader />
      ) : (
        <WelcomePage items={carousel} bg="/assets/desktop/work-setup-1.jpg" />
      )}
    </div>
  );
}
