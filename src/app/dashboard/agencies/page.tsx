import { Button } from "@/components/ui/button";
import { CreateAgency } from "./components/create-agency";

export default function Agencias() {
  return (
    <div>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Agências</h2>
        <div className="flex items-center space-x-2">
          <CreateAgency />
        </div>
        
      </div>

      <div className="flex items-center justify-between space-y-2">
          {/* <DataTable data={tasks} columns={columns} /> */}

          TABLE
      </div>
    </div>
  );
}
