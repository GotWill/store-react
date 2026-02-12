import { productService } from "@/api/services/product";
import type { Product } from "@/types/products";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RelatedProducts from "./components/related-products";
import ProductDetails from "./components/product-details";
import { SkeletronDetails } from "./components/skeletron";

export default function ProductDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      return (await productService.getProduct(id as string)) as Product;
    },
  });

  const { data: relatedProducts } = useQuery({
    queryKey: ["relatedProducts", id],
    enabled: Boolean(product),
    queryFn: async () => {
      if (!product) return;
      return await productService.getProductsRelated(product);
    },
  });

  useEffect(() => {
    if (isLoading) return;

    if (isError || !product) {
      navigate("/");
    }
  }, [isLoading, isError, product, navigate]);

  if (isLoading) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SkeletronDetails />
      </main>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-8">
          <ol className="flex items-center gap-2">
            <li>
              <a href="/" className="hover:text-primary transition-colors">
                Início
              </a>
            </li>
            <li>/</li>
            <li>
              <a
                href="/produtos"
                className="hover:text-primary transition-colors"
              >
                Produtos
              </a>
            </li>
            <li>/</li>
            <li className="text-foreground">{product?.title}</li>
          </ol>
        </nav>

        {/* Product Details */}
        <ProductDetails product={product} />

        {/* Related Products */}
        <RelatedProducts relatedProducts={relatedProducts} />
      </main>
    </div>
  );
}
