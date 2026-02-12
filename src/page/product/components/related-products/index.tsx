import { CardProduct } from "@/components/card-product";
import type { Product } from "@/types/products";

type RelatedProductsProps = {
  relatedProducts: Product[] | undefined;
};

export default function RelatedProducts({
  relatedProducts,
}: RelatedProductsProps) {
  return (
    <section>
      <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-8">
        Produtos Relacionados
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts?.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
