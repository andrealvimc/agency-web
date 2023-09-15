import { Metadata } from "next"
import { MainNav } from "@/components/dashboard/main-nav"
import { Search } from "@/components/dashboard/search"
import { UserNav } from "@/components/dashboard/user-nav"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import Image from "next/image"
import TeamSwitcher from "@/components/dashboard/team-switcher"

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
            <img src="/logo.png"  className="h-12"/>
            <Suspense fallback={<div className="flex items-center space-x-4 lg:space-x-6">Loading navbar...</div>}>
              <MainNav className="mx-6" />
            </Suspense>
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