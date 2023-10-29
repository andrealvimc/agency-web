'use client'
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Role } from "@/enums";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";


type navLinkType = {
  name: string;
  href: string;
  label?: string;
  roles: Role[];
};

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
   const pathname = usePathname();
 
  const { data: session } = useSession();

  if (!session) return;
  if(!session.user) return;

  const navLinks: navLinkType[] = [
    { name: "Overview", href: "/dashboard", roles: [Role.ADMIN] },
    { name: "Início", href: "/dashboard", roles: [Role.AGENCY] },
    { name: "Agências", href: "/dashboard/agencies", label: "agencies", roles: [Role.ADMIN] },
    { name: "Usuários", href: "/dashboard/users", label: "users", roles: [Role.ADMIN] },

    { name: "Categorias", href: "/dashboard/categories", label: "categories", roles: [Role.AGENCY, Role.ADMIN]},
    { name: "Criativos", href: "/dashboard/creatives", label: "creatives", roles: [Role.AGENCY, Role.ADMIN]},
    { name: "Páginas", href: "/dashboard/pages", label: "pages",  roles: [Role.AGENCY, Role.ADMIN]},
    { name: "Contas", href: "/dashboard/accounts", label: "accounts", roles: [Role.AGENCY, Role.ADMIN]},

    { name: "CRM", href: "/dashboard/crm", label: "crm", roles: [ Role.MANAGER, Role.CUSTOMER, Role.SELLER]},
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
            className={`text-sm font-medium transition-colors hover:text-primary ${pathname.includes(item.label || "test") ? "text-primary" : ""}`}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
