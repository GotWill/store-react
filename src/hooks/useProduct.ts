import { productService } from "@/api/services/product";
import type { Product } from "@/types/products";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

type Orders = "lowest-price" | "highest-price" | "best-selling" | "best-rated";

export default function useProduct() {
  const [searchParams] = useSearchParams();
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const data = await productService.getAllProducts();
      return data;
    },
  });

  const sourceProducts: Product[] = Array.isArray(products) ? products : [];
  const order = searchParams.get("order") as Orders | null;

  const categories =
    searchParams.get("categories")?.split(",").filter(Boolean) ?? [];

  let result = sourceProducts;

  if (categories.length > 0) {
    result = sourceProducts.filter((product) =>
      categories.includes(product.category)
    );
  }

  switch (order) {
    case "lowest-price":
      result = [...result].sort((a, b) => a.price - b.price);
      break;

    case "highest-price":
      result = [...result].sort((a, b) => b.price - a.price);
      break;

    case "best-selling":
      result = [...result].sort((a, b) => b.rating.count - a.rating.count);
      break;

    case "best-rated":
      result = [...result].sort((a, b) => b.rating.rate - a.rating.rate);
      break;
  }

  return {
    productCurrent: result,
    isLoading,
  };
}
