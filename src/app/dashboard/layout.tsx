import { Metadata } from "next"
import { MainNav } from "@/components/dashboard/main-nav"
import { Search } from "@/components/dashboard/search"
import { UserNav } from "@/components/dashboard/user-nav"
import { Inter } from "next/font/google"

export const metadata: Metadata = {
  title: 'Agencia Escalavel',
  description: 'A plataforma #1 para escalar o lucro da sua agência',
}

export default function LayoutDashboard({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <div className="flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          {/* <TeamSwitcher /> */}
          <img src="./logo.png" className="h-12"/>
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
      </div>
      </div>
      
      <div className="flex-1 space-y-4 p-8 pt-6">
        {children}
      </div>

        
    </html>
  )
}