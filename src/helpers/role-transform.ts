import { Role } from "@/enums";

export function transformRoleToText(role: string) {
  switch (role) {
    case Role.ADMIN:
      return "Admin";
    case Role.AGENCY:
      return "Dono";
    case Role.SELLER:
      return "Vendedor";
    case Role.CUSTOMER:
      return "Cliente";
    case Role.MANAGER:
      return "Gerente";
    default:
      return "Unknown";
  }
}
