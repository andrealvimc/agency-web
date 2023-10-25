'use server'

import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/types";


export async function getAvailableOwners(): Promise<User[]> {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user?.token}`,
    },
    next: { revalidate: 10} 
  });


   if (res.status !== 200) {
    throw new Error("Failed to fetch data");
  }


  const data = await res.json();

  

  const availableOwners = data.filter((user: User) => user.agencyRole == "manager" && user.role == "agency");

  return availableOwners;
}