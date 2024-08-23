import Switch from "@/components/Switch";
import Icon from "@mdi/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  mdiBriefcaseOutline,
  mdiAccountEdit,
  mdiLockOffOutline,
  mdiAccountDetailsOutline,
  mdiMenu,
} from "@mdi/js";

export default function ProfileMob({ session, login, signout }) {
    const profileRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleClick = (e) => {
        if (!profileRef.current.contains(e.target)) {
            setOpen(false);
        }
    }

    document.addEventListener('mousedown', handleClick);

    return () => {
        document.removeEventListener('mousedown', handleClick);
    }
  }, [])

  return (
    <div className="group relative flex items-center ml-6" ref={profileRef}>
      <Icon
        path={mdiMenu}
        size="2rem"
        className="text-white cursor-pointer"
        onClick={() => setOpen(!open)}
      />

      <div
        className={
          "absolute top-[50px] right-[5px] group-hover:block bg-btnDarkHover rounded-[12px] z-[999] text-white min-w-[300px] " +
          (open ? "block" : "hidden")
        }
      >
        {session ? (
          <div className="px-6 py-4 flex items-center border-b-veryLightBlue border-b ">
            <Image
              height={30}
              width={30}
              src={session?.image}
              className="rounded-full max-w-[30px] max-h-[30px] mr-4"
              referrerPolicy="no-referrer"
              alt="user-image"
            />
            <div>
              <p className="font-bold">{session?.name}</p>
              <p className="font-medium">{session?.email}</p>
            </div>
          </div>
        ) : null}
        {session ? (
          <>
            <div className="px-6 py-4 ">
              <Link
                href="/appliedCompanies"
                className="font-medium w-full text-left"
              >
                <span>
                  <Icon
                    path={mdiBriefcaseOutline}
                    size={1}
                    className="inline-block mr-3"
                  />
                  <span>Applied Companies</span>
                </span>
              </Link>
            </div>
            <div className="px-6 py-4">
              <Link href="/profile/edit">
                <span>
                  <Icon
                    path={mdiAccountEdit}
                    size={1}
                    className="inline-block mr-3"
                  />
                  <span>Update Details</span>
                </span>
              </Link>
            </div>
            <div className="px-6 py-4">
              <Link href="/profile/view">
                {" "}
                <span>
                  <Icon
                    path={mdiAccountDetailsOutline}
                    size={1}
                    className="inline-block mr-3"
                  />
                  <span>View Profile</span>
                </span>
              </Link>
            </div>
          </>
        ) : null}
        <div className="flex item-center ml-auto my-auto px-6 py-4 justify-between">
          <p>Theme</p>
          <div className="flex shrink-0">
            <Image
              src="/assets/desktop/icon-sun.svg"
              height={24}
              width={24}
              className="md:mr-6 sm:mr-4"
              alt="icon"
            />
            <Switch />
            <Image
              src="/assets/desktop/icon-moon.svg"
              height={24}
              width={24}
              className="md:ml-6 sm:ml-4"
              alt="icon"
            />
          </div>
        </div>
        <div>
          {session ? (
            <button
              className="px-6 py-4 font-medium w-full text-left"
              onClick={signout}
            >
              <span>
                <Icon
                  path={mdiLockOffOutline}
                  size={1}
                  className="inline-block mr-3"
                />
                <span>Logout</span>
              </span>
            </button>
          ) : (
            <button
              className="px-6 py-4 font-medium w-full text-left"
              onClick={login}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
