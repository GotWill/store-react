import { CardProduct } from "@/components/card-product";
import SkeletronProduct from "@/components/skeletron-product";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useProduct from "@/hooks/useProduct";
import { SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AsideFilters from "./components/aside-filters";

export default function ProdutosPage() {
  const [select, setSelected] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const { productCurrent, isLoading } = useProduct();

  const categories = searchParams.get("categories");

  useEffect(() => {
    if (!select) return;

    if (categories) {
      setSearchParams({ order: select, categories: categories.toString() });
      return;
    }
    setSearchParams({ order: select });
  }, [select, setSearchParams, categories]);

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
            Nossos Produtos
          </h1>
          <p className="text-muted-foreground mt-2">
            Explore nossa coleção completa de produtos exclusivos
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <Button
            variant="outline"
            className="lg:hidden flex items-center gap-2 border-border bg-transparent"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtros
          </Button>

          {/* Filters Sidebar */}
          <AsideFilters />

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-6 border-b border-border">
              <p className="text-sm text-muted-foreground">
                Exibindo{" "}
                <span className="font-medium text-foreground">
                  {productCurrent?.length}
                </span>{" "}
                produtos
              </p>
              <div className="flex items-center gap-2">
                <Select onValueChange={setSelected}>
                  <SelectTrigger>
                    <SelectValue placeholder="Ordenar por:"></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="lowest-price">Menor Preço</SelectItem>
                      <SelectItem value="highest-price">Maior Preço</SelectItem>
                      <SelectItem value="best-selling">
                        Mais Vendidos
                      </SelectItem>
                      <SelectItem value="best-rated">
                        Melhor Avaliados
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isLoading && (
              <div className="grid grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <SkeletronProduct key={index} />
                ))}
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {productCurrent?.map((product) => (
                <CardProduct key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
