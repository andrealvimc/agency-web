'use client'
import Link from "next/link";

import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { Role } from "@/enums";
import { useSession } from "next-auth/react";

type navLinkType = {
  name: string;
  href: string;
  roles: Role[];
};

export async function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const { data: session } = useSession();

  if (!session) return;
  if(!session.user) return;

  const navLinks: navLinkType[] = [
    { name: "Overview", href: "/dashboard", roles: [Role.ADMIN] },
    { name: "Usuários", href: "/dashboard/usuarios", roles: [Role.ADMIN] },
    { name: "Agências", href: "/dashboard/agencias", roles: [Role.ADMIN] },
    { name: "Templates", href: "/dashboard/templates", roles: [Role.ADMIN] },
    { name: "Categorias", href: "/dashboard/categorias", roles: [Role.AGENCY, Role.ADMIN]},

    { name: "Páginas", href: "/dashboard/paginas", roles: [Role.AGENCY, Role.ADMIN]},
    { name: "Contas", href: "/dashboard/contas", roles: [Role.AGENCY, Role.ADMIN]},
  ];


  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {navLinks.map((item, idx) => {
        const role: any = session.user?.role || Role.CUSTOMER
        const hasRole =  item.roles.includes(role);
        
        if(!hasRole) return;

        return (
          <Link
            key={idx}
            href={item.href}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {item.name}
          </Link>
        );
      })}

      {/* <Link
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
      </Link> */}
    </nav>
  );
}
