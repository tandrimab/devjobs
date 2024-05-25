import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProfileForm from "@/components/ProfileForm";
import ApiError from "@/utilities/backend/ApiError";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";

export default async function Page() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {

    throw new Error("Your session has been expired.");
  
  } else {
    const cookieStore = cookies();

    const nextAuthSessionToken = cookieStore.get("next-auth.session-token");

    const requestOptions = {
      method: "GET",
      
      headers: {
        Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
      },
      
      next: { revalidate: 1 },
    };

    const resp = await fetch(
      process.env.NEXTAUTH_URL + "/api/user/profile",
      requestOptions
    );
    
    const responseJson = await resp.json();

    if (!responseJson.success) {

      if (responseJson.statusCode === 401) {
        
        requestOptions.method = 'POST';
        
        requestOptions.body = JSON.stringify({});
        
      } else {
      
        throw new Error(responseJson.message || "Something went wrong.");
      }
    } else {
      return <ProfileForm defaultValues={responseJson.profile} />;
    }
  }
}
