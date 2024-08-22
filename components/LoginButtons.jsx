"use client";
import Icon from "@mdi/react";
import { mdiGithub, mdiGoogle, mdiMicrosoftOutlook } from "@mdi/js";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { usePathStore } from "@/app/store/store";
import Image from "next/image";

export default function LoginButtons() {
  const { data: session } = useSession();
  const router = useRouter();
  const { prevPath } = usePathStore();

  useEffect(() => {
    if (session?.user) {
      router.push(prevPath);
    }
  }, [session, router]);

  return (
    <div className="h-fit ">
      <div className="flex flex-col items-center justify-center">
        <div className="w-10/12 flex items-center flex-col py-10 px-10">
          <div className="rounded-[6px] md:px-4 flex flex-row max-w-8/12 mx-auto border-[1px] border-lightBlue justify-center items-center cursor-pointer hover:transition-all hover:delay-100 hover:duration-500 hover:scale-110 my-5">
            <Icon path={mdiGithub} size="2.5rem" color="white" />
            <button
              onClick={() => signIn("github")}
              className="text-base text-darkBlue font-medium py-2 px-8 shrink-0"
            >
              Signin with Github
            </button>
          </div>
          <div className="rounded-[6px] md:px-4 flex flex-row max-w-8/12 mx-auto border-[1px] border-lightBlue justify-center items-center cursor-pointer my-5 hover:transition-all hover:delay-100 hover:duration-500 hover:scale-110">
            <Icon path={mdiGoogle} size="2.5rem" color="white" />
            <button
              onClick={() => signIn("google")}
              className="text-base text-darkBlue font-medium py-2 px-8 shrink-0"
            >
              Signin with Google
            </button>
          </div>
          <div className="rounded-[6px] md:px-4 flex flex-row max-w-8/12 mx-auto border-[1px] border-lightBlue justify-center items-center cursor-pointer my-5 hover:transition-all hover:delay-100 hover:duration-500 hover:scale-110">
            <Icon path={mdiMicrosoftOutlook} size="2.5rem" color="white" />
            <button
              onClick={() => signIn("azure-ad", { callbackUrl: "/" })}
              className="text-base font-medium py-2 px-8 shrink-0 text-darkBlue"
            >
              Signin with Outlook
            </button>
          </div>
          <a href="/">
            <div className="flex gap-3 mt-6 text-sm">
              <Image
                src="/assets/desktop/arrow.svg"
                height={20}
                width={40}
                alt="arrow"
                className="rotate-[180deg]"
              />
              <p className="text-darkBlue">Back to Home</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
