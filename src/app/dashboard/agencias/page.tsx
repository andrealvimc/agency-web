import { Button } from "@/components/ui/button";

export default function Agencias() {

  return (
    <div>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Agências</h2>
        <div className="flex items-center space-x-2">
          {/* <CalendarDateRangePicker />*/}
          <Button>Criar Agencia</Button> 

        </div>
      </div>
    </div>
  )
}