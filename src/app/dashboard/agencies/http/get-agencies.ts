import { getServerSession } from "next-auth";


import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getAgencies(): Promise<any[]> {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/agency`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user?.token}`,
    },
  });


  if (res.status !== 200) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}