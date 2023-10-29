import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Category } from "@/types";

export async function getCategories(): Promise<Category[]> {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/category`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user?.token}`,
    },
  });


  if (res.status !== 200) {
    // console.log(res.json())
    throw new Error("Failed to fetch data");
  }

  return res.json();
}