import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import ProductInCart from "./components/product-cart";
import OrderSummary from "./components/order-summary";
import ShippingInfo from "./components/shipping-info";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { DialogAccount } from "./components/dialog-account";
import { Skeletron } from "./components/skeletron";
import { useCheckout } from "./hooks/useCheckout";

export default function CheckoutPage() {
  const {
    userAuth,
    isLoading,
    cart,
    form,
    addresses,
    dialogOpen,
    navigate,
    setDialogOpen,
    handleFinishedCheckout,
  } = useCheckout();

  if (userAuth && isLoading) return <Skeletron />;

  return (
    <div className="flex flex-col bg-background">
      <main className="flex-1 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/produtos"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Continuar comprando
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Seu Carrinho
          </h1>
          {cart.length === 0 ? (
            <Card className="text-center py-16">
              <CardContent>
                <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Seu carrinho está vazio
                </h2>
                <p className="text-muted-foreground mb-6">
                  Adicione produtos para continuar suas compras
                </p>
                <Link to="/produtos">
                  <Button>Ver Produtos</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5 text-primary" />
                      Itens do Carrinho ({cart.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cart.map(({ product, quantity }, index) => (
                      <ProductInCart
                        key={product.id}
                        product={product}
                        quantity={quantity}
                        index={index}
                      />
                    ))}
                  </CardContent>
                </Card>
                <ShippingInfo />
              </div>

              {/* Order Summary */}
              <div className="w-full flex flex-col gap-4">
                {userAuth && addresses.length > 0 && (
                  <Form {...form}>
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Escolha seu endereco" />
                              </SelectTrigger>
                              <SelectContent className="w-full">
                                {addresses.map((address) => (
                                  <SelectItem
                                    key={address.id}
                                    value={`${address.id}`}
                                  >
                                    {address.neighborhood} - {address.street} -{" "}
                                    {address.number}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </Form>
                )}

                {userAuth && addresses.length === 0 && (
                  <Button
                    onClick={() => navigate("/enderecos")}
                    variant="outline"
                  >
                    Cadastrar Endereços
                  </Button>
                )}
                <OrderSummary handleFinishedCheckout={handleFinishedCheckout} />
              </div>
            </div>
          )}

          <DialogAccount
            dialogOpen={dialogOpen}
            setDialogOpen={() => setDialogOpen(false)}
          />
        </div>
      </main>
    </div>
  );
}
