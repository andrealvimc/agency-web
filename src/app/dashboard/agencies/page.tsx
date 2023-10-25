

import { CreateAgency } from "./components/create-agency";

import { AgenciesList } from "./components/agency-list";
import { Suspense } from "react";
import { getAgencies } from "./http/get-agencies";


export default async function Agencias() {
  const data = await getAgencies();

  return (
    <div>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Agências</h2>
        <div className="flex items-center space-x-2">
          <CreateAgency />
        </div>
      </div>

      <div className="flex items-center justify-between space-y-2">
        <Suspense fallback={'carregando'}>
          <AgenciesList data={data} />
        </Suspense>
      </div>
    </div>
  );
}
