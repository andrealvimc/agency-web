
interface AgencyEditPageProps  {
    params: {
        id: string
    }
}

export default function AgencyEditPag({params}: AgencyEditPageProps) {

    return (
        <div>{params.id}   EDICAO</div>
    )
}