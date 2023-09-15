import dynamic from "next/dynamic"
import { Metadata } from "next"
import { MainNav } from "@/components/dashboard/main-nav"
import { Search } from "@/components/dashboard/search"
import { UserNav } from "@/components/dashboard/user-nav"
import { Suspense } from "react"
import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "./components/sidebar-nav"

// const SidebarNav = dynamic(() => import('./components/sidebar-nav'), { ssr: false })



export const metadata: Metadata = {
  title: 'Agencia Escalavel',
  description: 'A plataforma #1 para escalar o lucro da sua agência',
}


const sidebarNavItems = [
  {
    title: "Pefil",
    href: "/settings",
  },
  {
    title: "Conta",
    href: "/settings/account",
  },
  {
    title: "Aparencia",
    href: "/settings/appearance",
  },
  {
    title: "Notificações",
    href: "/settings/notifications",
  },
]

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
      
      <div className="flex-1 space-y-6 p-10 max-w-7xl lg:px-8 pb-16 mx-auto md:block">
        <div className="space-y-0.5">
          <h2 className="text-3xl font-semibold tracking-tight">Configurações</h2>
          <p className="text-muted-foreground">
            Gerencie as configurações de sua conta e defina as suas preferências
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl w-full">
            {children}
          </div>
          
          </div>
        
      </div>

        
    </html>
  )
}