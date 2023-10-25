import { getServerSession } from "next-auth";

import { CreateAgency } from "./components/create-agency";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AgenciesList } from "./components/agencies";
import { Suspense } from "react";

async function getAgenciesData(): Promise<any[]> {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/agency`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user?.token}`,
    },
    next: { revalidate: 3600 } 
  });


  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Agencias() {
  const data = await getAgenciesData();

  return (
    <div>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Agências</h2>
        <div className="flex items-center space-x-2">
          <CreateAgency />
        </div>
      </div>

      <div className="flex items-center justify-between space-y-2">
        <Suspense>
          <AgenciesList data={data} />
        </Suspense>
      </div>
    </div>
  );
}
