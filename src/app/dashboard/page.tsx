
import { getServerSession } from "next-auth"

import AdminDashboardPage from "./AdminPage";
import AgencyDashboardPage from "./AgencyPage";
import { Suspense } from "react";
import Denied from "../denied/page";
import CustomerDashboardPage from "./CustomerPage";
import { authOptions } from "../api/auth/[...nextauth]/route";


export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if(session?.user?.role === 'admin'){ 

    return (
      <Suspense fallback={<div>LOADING......</div>}>
        <AdminDashboardPage />
      </Suspense>
    )
  }

  if(session?.user?.role === 'agency'){ 
    const agencyId = session?.user?.agencyId || "";

    return (
       <Suspense fallback={<div>LOADING......</div>}>
        <AgencyDashboardPage agencyId={agencyId} user={session.user} />
      </Suspense>
    )
  }

  if(session?.user?.role === 'customer'){ 
    const agencyId = session?.user?.agencyId || "";

    return (
       <Suspense fallback={<div>LOADING......</div>}>
        <CustomerDashboardPage agencyId={agencyId} user={session.user} />
      </Suspense>
    )
  }

  return (
    <Denied />
  );
}
