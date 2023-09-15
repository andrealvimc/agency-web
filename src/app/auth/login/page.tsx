import { Metadata } from "next"
import Link from "next/link"

import { UserAuthForm } from "./forms/user-auth-form"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Agencia Escalavel - Login",
  description: "",
}

export default async function AuthenticationPage() {
  const session = await getServerSession()

  if(session?.user) return redirect( "/dashboard" )

  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-neutral-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Agência Escalável
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-0">
            {/* <p className="text-lg">
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than
              ever before.&rdquo;
            </p> */}
            <footer className="text-xs">Copyright © Agência Escalável </footer>
          </blockquote>
        </div>
      </div>
      <div className="flex justify-center items-center h-screen">
        <div className="lg:p-8 ">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Faça login na sua conta
            </h1>
            <p className="text-sm text-muted-foreground">
              Digite seu email e sua senha de acesso.
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Ao clicar em continuar, você concorda com nossos {" "}
            
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Termos de Serviço
            </Link>{" "}
            e{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Política de Privacidade
            </Link>
            .
          </p>
        </div>
      </div>
      </div>
    </div>
  )
}