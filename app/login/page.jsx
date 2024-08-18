"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { usePathStore } from "../store/store";
// import WelcomePage from "@/components/WelcomePage";
import DotsLoader from "@/components/DotsLoader";
import LoginButtons from "@/components/LoginButtons";
import AdminForm from "@/components/AdminForm";
import AnimatedLogo from "@/components/AnimatedLogo";
import useWindowSize from "@/utilities/hooks/useWindowSize";
import Icon from "@mdi/react";
import { mdiLaptop } from "@mdi/js";
import { mdiBook } from "@mdi/js";
import { mdiPen } from "@mdi/js";
import { mdiAbacus } from "@mdi/js";
import { mdiNetwork } from "@mdi/js";
import { mdiCloudSearch } from "@mdi/js";

export default function LoginPage({}) {
  const { data: session } = useSession();
  const router = useRouter();
  const { prevPath } = usePathStore();
  const [width, _] = useWindowSize();

  useEffect(() => {
    if (session?.user) {
      router.push(prevPath);
    }
  }, [session, router]);

  return (
    <div className="h-screen w-full bg-midnight flex items-center justify-center login-container">
      <Icon
        path={mdiLaptop}
        size={1}
        color="grey"
        className="icon absolute z-1 top-[10%] left-0"
      />
      <Icon
        path={mdiBook}
        size={1}
        color="grey"
        className="icon absolute z-1 top-[50%] left-[20%]"
      />
      <Icon
        path={mdiPen}
        size={1}
        color="grey"
        className="icon absolute z-1 top-[70%] left-[50%]"
      />
      <Icon
        path={mdiAbacus}
        size={1}
        color="grey"
        className="icon absolute z-1 top-[20%] left-[70%]"
      />
      <Icon
        path={mdiLaptop}
        size={1}
        color="grey"
        className="icon absolute z-1 bottom-[5%] right-[5%]"
      />
        <Icon
          path={mdiBook}
          size={1}
          color="grey"
          className="icon absolute z-1 top-[40%] left-[45%]"
        />
      <Icon
        path={mdiLaptop}
        size={1}
        color="grey"
        className="icon absolute z-1 top-[15%] left-2"
      />
        <Icon
          path={mdiCloudSearch}
          size={1}
          color="grey"
          className="icon absolute z-1 top-[29%] left-[80%]"
        />
        <Icon
          path={mdiNetwork}
          size={1}
          color="grey"
          className="icon absolute z-1 bottom-[2%] right-[92%]"
        />
      <Icon
        path={mdiPen}
        size={1}
        color="grey"
        className="icon absolute z-1 top-[60%] left-[35%]"
      />

      <div
        className={
          "relative w-[1200px] h-[60%] border-2 border-darkBlue shadow-blue-border grid place-content-center overflow-hidden gap-4 m-4 " +
          (width >= 878 ? "grid-cols-2" : "grid-cols-1")
        }
      >
        {width >= 878 && (
          <div
            className="h-[670px] w-[983px] absolute top-[20px] right-[15px] lg:rotate-[15deg] lg:skew-y-[26deg] lg:skew-x-[7deg] md:rotate-[20deg] md:skew-y-[30deg] md:skew-x-[10deg] origin-bottom-right"
            style={{ background: "linear-gradient(45deg, #19202D, #939BF4)" }}
          />
        )}
        <LoginButtons />
        {width >= 878 && (
          <div className="flex items-start w-[350px] flex-col ml-auto mr-6 ">
            <p className="text-[2rem] text-midnight transition-all animate-zoomInOutText z-1 text-nowrap ">
              Welcome to{" "}
            </p>
            <p className="text-[4rem] font-medium text mt-2 animate-showText text-transparent">
              devjobs
            </p>
            <p className="text-base font-medium text mt-2 animate-sliderLeft text-transparent lg:m-0 md:ml-2">
              Home for the largest Startup jobs community
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
