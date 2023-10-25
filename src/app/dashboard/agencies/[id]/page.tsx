
interface AgencyPageProps  {
    params: {
        id: string
    }
}

export default function AgencyPage({params}: AgencyPageProps) {

    return (
        <div>{params.id}</div>
    )
}