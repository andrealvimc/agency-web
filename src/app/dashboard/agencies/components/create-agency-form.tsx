"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/ui/icon";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  name: z.string().min(2, "O nome precisa ter no mínimo 2 caracteres"),
  nameFantasy: z
    .string()
    .min(2, "O nome fantasia precisa ter no mínimo 2 caracteres"),
  email: z.string().email("Email inválido").min(3, "Email inválido"),
  document: z.string().min(3, "O documento precisa ter no mínimo 3 caracteres"),
  phone: z.string().min(7, "O telefone precisa ter no mínimo 7 caracteres"),
  address: z.string(),
  ownerEmail: z.string().email("Email inválido").min(3, "Email inválido"),
});

export default function CreateAgencyForm() {
  const { data: session } = useSession();
    const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid, isLoading },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  console.log(process.env.NEXT_PUBLIC_SERVER_URL)

  async function handleFormSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/agency`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Ocorreu um erro ao enviar o formulário");
      }

      toast({
        title: "Agencia criada com sucesso",
        variant: "default",
      });

      router.push('/dashboard/agencies')

      return response.json();
    } catch (error) {
      console.log(error);
      toast({
        title: "Ocorreu um erro ao criar a agencia.",
        variant: "destructive",
      });
    }

  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex flex-col space-y-3">
        <div className="grid w-full max-w-xs items-center gap-1.5">
          <Label htmlFor="name">Nome</Label>
          <Input
            type="text"
            id="name"
            placeholder="Nome da agência"
            {...register("name", { required: true })}
            disabled={isLoading}
            className={`${errors.name ? "border-red-600" : ""}`}
          />
        </div>
        <div className="grid w-full max-w-xs items-center gap-1.5">
          <Label htmlFor="nameFantasy">Nome Fantasia</Label>
          <Input
            type="text"
            id="nameFantasy"
            placeholder="Nome da fantasia"
            {...register("nameFantasy", { required: true })}
            disabled={isLoading}
            className={`${errors.nameFantasy ? "border-red-600" : ""}`}
          />
        </div>
        <div className="grid w-full max-w-xs items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Email da agência"
            {...register("email", { required: true })}
            disabled={isLoading}
            className={`${errors.email ? "border-red-600" : ""}`}
          />
        </div>
        <div className="grid w-full max-w-xs items-center gap-1.5">
          <Label htmlFor="document">CNPJ</Label>
          <Input
            type="text"
            id="document"
            placeholder="CNPJ da agência"
            {...register("document", { required: true })}
            disabled={isLoading}
            className={`${errors.document ? "border-red-600" : ""}`}
          />
        </div>
        <div className="grid w-full max-w-xs items-center gap-1.5">
          <Label htmlFor="address">Endereço</Label>
          <Input
            type="text"
            id="address"
            placeholder="Endereço da agência"
            {...register("address", { required: true })}
            disabled={isLoading}
            className={`${errors.address ? "border-red-600" : ""}`}
          />
        </div>
        <div className="grid w-full max-w-xs items-center gap-1.5">
          <Label htmlFor="phone">Telefone//Celular</Label>
          <Input
            type="text"
            id="phone"
            placeholder="Telefone da agência"
            {...register("phone", { required: true })}
            disabled={isLoading}
            className={`${errors.phone ? "border-red-600" : ""}`}
          />
        </div>
        <div className="grid w-full max-w-xs items-center gap-1.5">
          <Label htmlFor="ownerEmail">Email dono da agencia</Label>
          <Input
            type="text"
            id="ownerEmail"
            placeholder="Email dono da agência"
            {...register("ownerEmail", { required: true })}
            disabled={isLoading}
            className={`${errors.ownerEmail ? "border-red-600" : ""}`}
          />
        </div>
      </div>

      <DialogFooter>
        <Button disabled={isLoading || !isValid}>
          {isLoading ||
            (isSubmitting && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ))}
          Acessar
        </Button>
      </DialogFooter>
    </form>
  );
}
