import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { KanbanBoard } from "@/components/crm/kanban-board";
import { getServerSession } from "next-auth";

export default async function  CRMPage() {

 const session = await getServerSession(authOptions)

 console.log(session?.user?.accountId)

  return (
    <div>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">CRM</h2>
        {session?.user?.accountId || "sem account"}
        <div className="flex items-center space-x-2">
          {/* <CreateAgency /> */}
          Funil de vendas
        </div>
        
      </div>

      <div className="flex mt-5 items-center space-y-2">
          <KanbanBoard />
      </div>
    </div>
  );
}
