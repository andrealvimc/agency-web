
import { Button } from "@/components/ui/button";
import { transformRoleToText } from "@/helpers/role-transform";
import { User } from "@/types/next-auth";

interface CustomerPageProps { 
  agencyId: string;
  user: User;
}

export default function CustomerDashboardPage({ agencyId, user }: CustomerPageProps){
  return (
    <div>

      <h1>DASHBOARD COMO CLIENTE LOGADA: ID DA AGENCIA: {agencyId}</h1>

      <div className="">
        {user.agencyRole}
        <div>Você é: {transformRoleToText(user.agencyRole || "")} dessa agência</div>
      </div>

      <Button className="bg-primary">BOTAO DE TESTE TEMA</Button>
    </div>
  )
}