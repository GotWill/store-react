import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import formatPrice from "@/helpers/format-price";
import { useCart } from "@/store/cart";
import { CreditCard } from "lucide-react";

type OrderSummaryProps = {
  handleFinishedCheckout: () => void;
};

export default function OrderSummary({
  handleFinishedCheckout,
}: OrderSummaryProps) {
  const { total, subtotal, shipping } = useCart((state) => state);

  return (
    <div className="lg:col-span-1">
      <Card className="sticky top-24">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Resumo do Pedido
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-foreground">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Frete</span>
            <span
              className={
                shipping === 0
                  ? "text-green-600 font-medium"
                  : "text-foreground"
              }
            >
              {shipping === 0 ? "Grátis" : formatPrice(shipping)}
            </span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="font-semibold text-foreground">Total</span>
            <span className="font-bold text-xl text-primary">
              {formatPrice(total)}
            </span>
          </div>

          <Button
            className="w-full gap-2 mt-4"
            size="lg"
            onClick={handleFinishedCheckout}
          >
            <CreditCard className="w-5 h-5" />
            Finalizar Compra
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Pagamento 100% seguro com criptografia
          </p>

          {/* Payment Methods */}
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2 text-center">
              Formas de pagamento{" "}
              
            </p>
            <div className="flex justify-center gap-2">
              {["Visa", "Master", "Pix", "Boleto"].map((method) => (
                <div
                  key={method}
                  className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground"
                >
                  {method}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
