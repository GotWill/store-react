import type { Product } from "@/types/products";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { mapCategories } from "@/lib/map-categories";
import { useFavorites } from "@/hooks/useFavorites";
import { useCart } from "@/store/cart";
import { useAuth } from "@/store/user";

type ProductCardProps = {
  product: Product;
};

export function CardProduct({ product }: ProductCardProps) {
  const { userAuth } = useAuth((state) => state);


  const { handleToggleFavorite } = useFavorites({
    product,
    userId: userAuth?.uid,
  });

  const addItem = useCart((state) => state.addItem);

  return (
    <div className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.title}
          className="group-hover:scale-105 transition-transform duration-500"
        />
        <button
          onClick={handleToggleFavorite}
          className="absolute top-3 right-3 w-8 h-8 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
        >
          <Heart className="w-4 h-4" />
        </button>
      </div>
      <div className="p-4">
        <span className="text-xs text-primary font-medium uppercase tracking-wide">
          {mapCategories[product.category]}
        </span>
        <Link
          to={`/produto/${product.title.replaceAll(" ", "").replace("/", "")}/${
            product.id
          }`}
        >
          <h3 className="font-medium text-foreground mt-1 group-hover:text-primary transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-semibold text-foreground">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </span>
        </div>
        <Button
          onClick={() => addItem({ product, quantity: 1 })}
          className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Adicionar ao Carrinho
        </Button>
      </div>
    </div>
  );
}
