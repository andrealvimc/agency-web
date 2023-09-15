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
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid, isLoading },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function handleFormSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex flex-col space-y-3">
        <div className="grid w-full max-w-xs items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            {...register("email", { required: true })}
            disabled={isLoading}
            className={`${errors.email ? "border-red-600" : ""}`}
          />
        </div>

        <div className="grid w-full max-w-xs items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>

        <div className="grid w-full max-w-xs items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>
      </div>

      <DialogFooter>
        <Button disabled={!isDirty || !isValid || isSubmitting}>
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
