'use client';

import { useSession } from "next-auth/react";
import AdminDashboardPage from "./AdminPage";
import { useRouter } from "next/navigation";
import AgencyDashboardPage from "./AgencyPage";
import { Suspense } from "react";
import Denied from "../denied/page";
import CustomerDashboardPage from "./CustomerPage";


export default function DashboardPage() {
  const { data: session} = useSession();
  

  if(session?.user?.role === 'admin'){ 

    return (
      <Suspense fallback={<div>LOADING......</div>}>
        <AdminDashboardPage />
      </Suspense>
    )
  }

  if(session?.user?.role === 'agency'){ 
    console.log(session?.user, 'USE PAGE')
    const agencyId = session?.user?.agencyId || "";

    return (
       <Suspense fallback={<div>LOADING......</div>}>
        <AgencyDashboardPage agencyId={agencyId} user={session.user} />
      </Suspense>
    )
  }

  if(session?.user?.role === 'customer'){ 
    console.log(session?.user, 'USE PAGE')
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
