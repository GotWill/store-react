import { Card, CardContent } from "@/components/ui/card";
import formatPrice from "@/helpers/format-price";
import { useCart } from "@/store/cart";
import { Truck } from "lucide-react";

export default function ShippingInfo() {
  const { subtotal } = useCart((state) => state);

  return (
    <Card className="bg-accent/30 border-primary/20">
      <CardContent className="py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Truck className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground">
              {subtotal >= 500
                ? "Frete Grátis!"
                : `Faltam ${formatPrice(500 - subtotal)} para frete grátis`}
            </p>
            <p className="text-sm text-muted-foreground">
              Em compras acima de R$ 500,00
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
