
import { transformRoleToText } from "@/helpers/role-transform";
import { User } from "@/types/next-auth";

interface AgencyPageProps { 
  agencyId: string;
  user: User;
}

export default function AgencyDashboardPage({ agencyId, user }: AgencyPageProps){

  return (
    <div>

      <h1>DASHBOARD COMO AGENCIA LOGADA: ID DA AGENCIA: {agencyId}</h1>

      <div className="">
        <div>Você é: {transformRoleToText(user.role)} dessa agência</div>
      </div>
    </div>
  )
}