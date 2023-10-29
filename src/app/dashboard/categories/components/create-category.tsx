

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/ui/icon";
import { useState, Suspense } from "react";
import CreateCategoryForm from "./create-category-form";

export function CreateCategory() {
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Criar Categoria</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Crie uma categoria</DialogTitle>
          {/* <DialogDescription>
            Configure a agência, quando terminar clique em criar!
          </DialogDescription> */}
        </DialogHeader>
         
        <Suspense fallback={<div>carregando...</div>}>
          <CreateCategoryForm  />
        </Suspense>
        
      </DialogContent>
    </Dialog>
  );
}
