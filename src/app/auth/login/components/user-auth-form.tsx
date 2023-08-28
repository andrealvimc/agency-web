"use client"

import * as React from "react"
import * as z from "zod";
import { useForm } from  "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from 'next/navigation'


import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icon"
import { useToast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof loginSchema>;


const loginSchema = z.object({
  email: z.string().email("Email inválido").min(3, "Email inválido"),
  password: z.string().min(3, 'A senha precisa ter no mínimo 3 caracteres')
})


export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter()
  const { toast } = useToast()

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid, isLoading },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

   async function onSubmitForm(data: FormData) { 

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl,
      });

      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        toast({
          title: "Erro ao efetuar login",
          description: "Tente novamente mais tarde",
          variant: "destructive",
        })
      }
      
    } catch (err) {
      toast({
        title: "Erro ao efetuar login",
        description: "Tente novamente mais tarde",
        variant: "destructive",
      })
    }
    
    
    // await new Promise<void>((resolve) => {
    //   setTimeout(() => {
    //     resolve();
    //   }, 2000); // 2 seconds in milliseconds
    // });
    // // router.push("/tweets");
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label className="" htmlFor="email">
              Email
            </Label>
            <Input
              {...register("email", { required: true })}
              id="email"
              placeholder="joao@agenciaescalavel.com.br"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              className={`${errors.email ? "border-red-600" : ""}`}
            />
            {errors?.email && (
              <p className="text-red-600 text-sm">
                {errors?.email?.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label className="" htmlFor="password">
              Senha
            </Label>
            <Input
              {...register("password", { required: true })}
              id="password"
              placeholder="Senha"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              className={`${errors.password ? "border-red-600" : ""}`}
            />
            {errors?.password && (
              <p className="text-red-600 text-sm">
                {errors?.password?.message}
              </p>
            )}
          </div>
          <Button disabled={!isDirty || !isValid || isSubmitting}>
            {isLoading || isSubmitting && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Acessar
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Ou continue com
          </span>
        </div>
      </div>
      <Button variant="outline" className="cursor-not-allowed" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  )
}