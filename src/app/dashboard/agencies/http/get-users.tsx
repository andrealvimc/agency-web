'use server'

import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/types";


export async function getUsers(): Promise<User[]> {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user?.token}`,
    },
    next: { revalidate: 10} 
  });


  if (!res.ok) {
    console.log(res.status, res.statusText)
    throw new Error("Failed to fetch data");
  }

  return res.json();
}