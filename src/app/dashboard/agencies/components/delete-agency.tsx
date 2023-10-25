'use client'

import { Button } from "@/components/ui/button"
import { deleteAgency } from "../http/delete-agency";
import { useSession } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";


interface DeleteAgencyProps {
    id: string
}

export function DeleteAgency({ id }: DeleteAgencyProps) {
    const { data: session } = useSession();
    const router = useRouter();

    const handleDeleteClick = async () => {
        const deleteAgencyResponse = await deleteAgency({ id }, session);

        if(deleteAgencyResponse) {
             toast({
                title: "Agencia deletada com sucesso",
                variant: "default",
            });

            router.push("/dashboard/agencies");
        } else {
            toast({
                title: "Erro ao deletar agencia",
                variant: "default",
            });
        
        }

    }

    return (
        <Button onClick={handleDeleteClick}>Deletar agencia</Button>
    )
}