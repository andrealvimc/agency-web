import { Suspense } from "react";
import { CategoriesList } from "./components/categories-list";
import { getCategories } from "./http/get-categories";
import { CreateCategory } from "./components/create-category";


export default async function CategoryPage() {
  const data = await getCategories();


  return (
    <div> 
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Categorias</h2>
        <div className="flex items-center space-x-2">
          <CreateCategory />
        </div>
      </div>

      <div className="flex items-center justify-between space-y-2">
        <Suspense fallback={'carregando'}>
          <CategoriesList data={data} />
        </Suspense>
      </div>
    </div>
  )
}