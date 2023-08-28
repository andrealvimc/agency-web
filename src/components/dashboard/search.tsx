import { Input } from "../ui/input";

export function Search() {
  return (
    <div>
      <Input
        type="search"
        placeholder="Pesquisar..."
        className="md:w-[100px] lg:w-[300px]"
      />
    </div>
  )
}