import Link from "next/link";

export default function Denied() {
  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-xl">Você não tem permissão para acessar essa página!</h1>
      <Link href={"/"} className="font-medium transition-colors hover:text-primary">
        Volte para a home
      </Link>
    </div>
  )
}