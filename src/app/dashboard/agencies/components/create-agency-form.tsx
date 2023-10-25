"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Suspense, useEffect, useState } from "react";
import { revalidatePath } from "next/cache";
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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { getUsers } from "../http/get-users";
import { createAgency } from "../http/create-agency";

export const FormSchema = z.object({
  name: z.string().min(2, "O nome precisa ter no mínimo 2 caracteres"),
  nameFantasy: z
    .string()
    .min(2, "O nome fantasia precisa ter no mínimo 2 caracteres"),
  email: z.string().email("Email inválido").min(3, "Email inválido"),
  document: z.string().min(3, "O documento precisa ter no mínimo 3 caracteres"),
  phone: z.string().min(7, "O telefone precisa ter no mínimo 7 caracteres"),
  address: z.string(),
  ownerEmail: z.string().email("Email inválido").min(3, "Email inválido"),
});

export default function CreateAgencyForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting, isDirty, isValid, isLoading },
  } = form;
  const [emails, setEmails] = useState<{ label: string; value: string }[]>([
    { label: "Padrão", value: "teste@alvim.net" },
  ]);

  async function handleFormSubmit(data: z.infer<typeof FormSchema>) {
    const createAgencyResponse = await createAgency(data, session)

    if (createAgencyResponse) {
      toast({
        title: "Agencia criada com sucesso",
        variant: "default",
      });
      router.push('/dashboard/agencies')
    } else {
      toast({
        title: "Ocorreu um erro ao criar a agencia.",
        variant: "destructive",
      });
    }

    // try {
    //   const response = await fetch(
    //     `${process.env.NEXT_PUBLIC_SERVER_URL}/agency`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${session?.user?.token}`,
    //       },
    //       body: JSON.stringify(data),
    //     }
    //   );


    //   if (response.status !== 200) {
    //     throw new Error("Ocorreu um erro ao enviar o formulário");
    //   }

    //   toast({
    //     title: "Agencia criada com sucesso",
    //     variant: "default",
    //   });

      
    //   router.refresh();
    //   return;
    // } catch (error) {
    //   console.log(error);
    //   return toast({
    //     title: "Ocorreu um erro ao criar a agencia.",
    //     variant: "destructive",
    //   });
    // }
  }

  // getEmails
  useEffect(() => {
    getUsers().then((usersLast) => {
      let emailsMap = usersLast.map((user) => {
        return {
          label: user.name,
          value: user.email,
        };
      });

      return setEmails(emailsMap);
    });
  }, [])

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
          <div className="grid w-full max-w-xs items-center gap-1.5">
            <Label htmlFor="nameFantasy">Nome Fantasia</Label>
            <Input
              type="text"
              id="nameFantasy"
              placeholder="Nome da fantasia"
              {...register("nameFantasy", { required: true })}
              disabled={isLoading}
              className={`${errors.nameFantasy ? "border-red-600" : ""}`}
            />
          </div>
          <div className="grid w-full max-w-xs items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Email da agência"
              {...register("email", { required: true })}
              disabled={isLoading}
              className={`${errors.email ? "border-red-600" : ""}`}
            />
          </div>
          <div className="grid w-full max-w-xs items-center gap-1.5">
            <Label htmlFor="document">CNPJ</Label>
            <Input
              type="text"
              id="document"
              placeholder="CNPJ da agência"
              {...register("document", { required: true })}
              disabled={isLoading}
              className={`${errors.document ? "border-red-600" : ""}`}
            />
          </div>
          <div className="grid w-full max-w-xs items-center gap-1.5">
            <Label htmlFor="address">Endereço</Label>
            <Input
              type="text"
              id="address"
              placeholder="Endereço da agência"
              {...register("address", { required: true })}
              disabled={isLoading}
              className={`${errors.address ? "border-red-600" : ""}`}
            />
          </div>
          <div className="grid w-full max-w-xs items-center gap-1.5">
            <Label htmlFor="phone">Telefone/Celular</Label>
            <Input
              type="text"
              id="phone"
              placeholder="Telefone da agência"
              {...register("phone", { required: true })}
              disabled={isLoading}
              className={`${errors.phone ? "border-red-600" : ""}`}
            />
          </div>
          <div className="grid w-full max-w-xs items-center gap-1.5">
            <Label htmlFor="ownerEmail">Dono da agencia</Label>
            
            <FormField
              control={form.control}
              name="ownerEmail"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? emails.find(
                                (email) => field.value === email.value
                              )?.label
                            : "Selecione o usuario "}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Busque Cliente..."
                          className="h-9"
                        />
                        <CommandEmpty>Cliente não encontrado</CommandEmpty>
                        <CommandGroup className="">
                          <Suspense fallback={"Carregando emails"}>
                            {emails.map((email) => (
                              <CommandItem
                                value={email.label}
                                key={email.value}
                                onSelect={() => {
                                  form.setValue("ownerEmail", email.value);
                                }}
                              >
                                {email.label}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    email.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </Suspense>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    {/* This is the language that will be used in the dashboard. */}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* SELECT ONWER 
          
          https://ui.shadcn.com/docs/components/combobox

            * TODO:
              - pegar os usuarios que podem ter uma agencia na API
              - setar o usuario selecionado e enviar pra API
          
          
          */}

            {/* SELECT ONWER */}
          </div>
        </div>

        <DialogFooter>
          <Button disabled={isLoading || !isValid}>
            {isLoading ||
              (isSubmitting && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ))}
            Acessar
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
