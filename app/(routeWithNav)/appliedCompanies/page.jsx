import { cookies } from "next/headers";
import { getData } from "@/utilities/serverSide/dataFetching"
import ShowCompany from "@/components/ShowCompany";


export default async function Page() {
    const cookieStore = cookies();

    const nextAuthSessionToken = cookieStore.get("next-auth.session-token");
    const headers = {
        Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
    }

    const data = await getData('/api/user/appliedCompanies', headers);

    return <ShowCompany companies={data} />
}