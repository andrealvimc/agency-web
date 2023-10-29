"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


import { Suspense, useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/ui/icon";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { createCategory } from "../http/create-category";

export const FormSchema = z.object({
  name: z.string().min(2, "O nome precisa ter no mínimo 2 caracteres"),
});

export default function CreateCategoryForm() {
  const { data: session } = useSession();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid, isLoading },
  } = form;


  async function handleFormSubmit(data: z.infer<typeof FormSchema>) {
    const createCategoryResponse = await createCategory(data, session);

    if (createCategoryResponse) {
      toast({
        title: "Categoria criada com sucesso",
        variant: "default",
      });

      location.reload();
      router.push("/dashboard/categories");
      

    } else {
      toast({
        title: "Ocorreu um erro ao criar a categoria.",
        variant: "destructive",
      });
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="flex flex-col space-y-3">
          <div className="grid w-full max-w-xs items-center gap-1.5">
            <Label htmlFor="name">Nome</Label>
            <Input
              type="text"
              id="name"
              placeholder="Nome da agência"
              {...register("name", { required: true })}
              disabled={isLoading}
              className={`${errors.name ? "border-red-600" : ""}`}
            />
          </div>
          
        </div>

        <DialogFooter>
          <Button disabled={isLoading || !isValid}>
            {isLoading ||
              (isSubmitting && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ))}
            Criar
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
