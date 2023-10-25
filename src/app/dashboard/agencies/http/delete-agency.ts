

import z from "zod";


export async function deleteAgency(
  data: { id: string },
  session: any
): Promise<boolean> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/agency`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (response.status !== 200) {
      throw new Error("Ocorreu um erro ao excluir a agencia");
    }

    return true;
  } catch (err) {
    console.log(err);

    return false;
  }
}
