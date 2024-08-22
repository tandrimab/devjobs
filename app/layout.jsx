import "./globals.css";
// import Navbar from "./Navbar";
import SessionProvider from "@/components/SessionProvider";
import { getServerSession } from "next-auth";
import ToastContainerWrapper from "@/components/ToastContainerWrapper";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Script from "next/script";
import ThemeLayout from "@/components/ThemeLayout";


export const metadata = {
  title: "Devjobs",
  description: "Platform to find your best matches to the companies",
};

export default async function Layout({ children, modal }) {
  const session = await getServerSession(authOptions);

  const src=`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_API_KEY}&libraries=places`

  return (
    <html lang="en">      
      <body>
        <ThemeLayout>
        <SessionProvider session={session}>
          <div className="bg-lightGrey dark:bg-midnight">
            {/* {!hiddenNav.includes(pathname) && <Navbar />} */}
            {/* <Navbar /> */}
            {children}
            {modal}
          </div>
        <Script type="text/javascript" src={src} strategy="afterInteractive" />
        </SessionProvider>
        </ThemeLayout>
        <ToastContainerWrapper />
      </body>
    </html>
  );
}
