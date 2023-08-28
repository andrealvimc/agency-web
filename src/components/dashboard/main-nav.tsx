import Link from "next/link"

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        href="/dashboard/usuarios"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Usuários
      </Link>
      <Link
        href="/dashboard/agencias"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Agências
      </Link>
      <Link
        href="/dashboard/templates"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Templates
      </Link>
      <Link
        href="/dashboard/categorias"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Categorias
      </Link>
    </nav>
  )
}