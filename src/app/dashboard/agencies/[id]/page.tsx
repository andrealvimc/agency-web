import { DeleteAgency } from "../components/delete-agency"

interface AgencyPageProps  {
    params: {
        id: string
    }
}

export default async function AgencyPage({params}: AgencyPageProps) {

    return (
        <div>
            <p>{params.id}</p>
            <DeleteAgency id={params.id} />
        </div>
    )
}