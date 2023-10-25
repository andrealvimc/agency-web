"use server";

import z from "zod";
import { FormSchema } from "../components/create-agency-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createAgency(
  data: z.infer<typeof FormSchema>,
  session: any
): Promise<boolean> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/agency`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (response.status !== 200) {
      throw new Error("Ocorreu um erro ao enviar o formulário");
    }

    return true;
    // return 

    //
  } catch (err) {
    console.log(err);

    return false;
  }
}
