import { Icons } from "@/components/ui/icon";
import Image from "next/image";


export default function Loading() {
  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col">
      <Image height={40} width={120} src="/logo.png" className="h-14" alt="logo"/>
      {/* <div className="h-20 w-20  rounded-full animate-pulse">Carregando...</div> */}
      <Icons.spinner className="h-8 w-8 animate-spin" />
    </div>
  )
}