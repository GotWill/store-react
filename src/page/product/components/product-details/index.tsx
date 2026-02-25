import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { useCart } from "@/store/cart";
import { useAuth } from "@/store/user";
import type { Product } from "@/types/products";
import {
  Heart,
  Minus,
  Plus,
  RefreshCw,
  Shield,
  Star,
  Truck,
} from "lucide-react";
import { useState } from "react";

type ProductDetailsProps = {
  product: Product;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { cart, addItem, updateQuantity } = useCart((state) => state);

  const userAuth = useAuth((state) => state.userAuth);
  const { handleToggleFavorite } = useFavorites({
    product,
    userId: userAuth?.uid,
  });

  const existingProduct = cart.find((item) => item.product.id === product?.id);

  const productQuantity = existingProduct?.quantity ?? 1;

  const [quantity, setQuantity] = useState(productQuantity);

  function handleAddToCart() {
    if (!existingProduct) {
      return addItem({ product, quantity });
    }
    updateQuantity(product, quantity);
  }

  return (
    <div className="grid lg:grid-cols-2 gap-12 mb-16">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="aspect-square rounded-2xl overflow-hidden bg-muted flex justify-center">
          <img src={product?.image} alt={product?.title} className="" />
        </div>
      </div>

      {/* Product Info */}
      <div>
        <span className="inline-block bg-secondary text-secondary-foreground text-sm font-medium px-3 py-1 rounded-full mb-4">
          {product?.category}
        </span>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
          {product?.title}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(product?.rating.rate as number)
                    ? "text-primary fill-primary"
                    : "text-muted fill-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {product?.rating.rate} ({product?.rating.count} avaliações)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-3 mb-6">
          <span className="text-3xl font-semibold text-foreground">
            R$ {product?.price.toFixed(2).replace(".", ",")}
          </span>
        </div>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed mb-8">
          {product?.description}
        </p>

        {/* Quantity */}
        <div className="mb-8">
          <span className="text-sm font-medium text-foreground block mb-3">
            Quantidade
          </span>
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-border rounded-lg">
              <button
                className="p-3 text-muted-foreground hover:text-primary transition-colors"
                data-testid={`decrement-${product.id}`}
              >
                <Minus
                  className="w-4 h-4"
                  onClick={() =>
                    setQuantity((prev) => (prev > 1 ? prev - 1 : prev))
                  }
                />
              </button>
              <span className="w-12 text-center font-medium text-foreground" data-testid='quantity-value'>
                {quantity}
              </span>
              <button
                className="p-3 text-muted-foreground hover:text-primary transition-colors"
                data-testid={`increment-${product.id}`}
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button
            onClick={handleAddToCart}
            size="lg"
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Adicionar ao Carrinho
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-border text-foreground hover:bg-secondary bg-transparent"
            onClick={handleToggleFavorite}
          >
            <Heart className="w-5 h-5 mr-2" />
            Favoritar
          </Button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-border">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-primary">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium text-foreground">Frete Grátis</p>
              <p className="text-muted-foreground">Acima de R$ 299</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-primary">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium text-foreground">Garantia</p>
              <p className="text-muted-foreground">12 meses</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-primary">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium text-foreground">Devolução</p>
              <p className="text-muted-foreground">30 dias</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
