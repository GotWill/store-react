import { Button } from "@/components/ui/button";
import formatPrice from "@/helpers/format-price";
import { useCart } from "@/store/cart";
import { useAuth } from "@/store/user";
import type { Product } from "@/types/products";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

type ProductInCartProps = {
  product: Product;
  quantity: number;
  index: number;
};

const ProductInCart = ({ product, quantity, index }: ProductInCartProps) => {
  const { cart, deleteItem, updateQuantity } = useCart((state) => state);
  const userAuth = useAuth((state) => state.userAuth);

  function handlePlus(product: Product, quantity: number) {
    updateQuantity(product, quantity + 1);
  }

  function handleMinus(product: Product, quantity: number) {
    if (quantity > 1) {
      updateQuantity(product, quantity - 1);
      return;
    }
    deleteItem(product.id);
  }

  return (
    <>
      <div className="flex gap-4">
        <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-lg overflow-hidden bg-muted shrink-0">
          <img
            src={product.image}
            alt={product.title}
            className="object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <Link
            to={`/produto/${product.title}/${product.id}`}
            className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2"
          >
            {product.title}
          </Link>
          <p className="text-primary font-semibold mt-1">
            {formatPrice(product.price)}
          </p>

          {/* Mobile: Actions below */}
          <div className="flex items-center justify-between mt-3 md:hidden">
            {/* Quantity Controls */}
            <div className="flex items-center gap-1 border border-border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-primary"
                onClick={() => handleMinus(product, quantity)}
                disabled={!userAuth}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-8 text-center font-medium text-sm">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-primary"
                onClick={() => handlePlus(product, quantity)}
                disabled={!userAuth}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Delete Button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => deleteItem(product.id)}
              disabled={!userAuth}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Desktop: Actions on the right */}
        <div className="hidden md:flex items-center gap-4">
          {/* Quantity Controls */}
          <div className="flex items-center gap-1 border border-border rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-muted-foreground hover:text-primary"
              onClick={() => handleMinus(product, quantity)}
              data-testid={`decrement-product-${product.id}`}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span data-testid="quantity-value-checkout" className="w-10 text-center font-medium">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-muted-foreground hover:text-primary"
              onClick={() => handlePlus(product, quantity)}
              data-testid={`increment-product-${product.id}`}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="w-24 text-right">
            <p className="font-semibold text-foreground">
              {formatPrice(product.price * quantity)}
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => deleteItem(product.id)}
            data-testid={`remove-product-${product.id}`}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      {index < cart.length - 1 && <Separator className="mt-4" />}
    </>
  );
};

export default ProductInCart;
