import { Button } from "@/components/ui/button"
import { getServerSession } from "next-auth"
import { signIn, signOut } from "next-auth/react"
import { redirect } from "next/navigation"

export default async function Home() {
  redirect('/dashboard')


  return (
    <div>
      <h1>HOME PRINCIPAL</h1>
      
      {/* {session?.user ? (
        <div>
          <Button onClick={() => signOut()}>
            Sair
          </Button>
        </div>
      ) : (
        <div>
          <Button onClick={() => signIn()} >
            Entrar
          </Button>
        </div>
      )} */}
    </div>
  )
}
