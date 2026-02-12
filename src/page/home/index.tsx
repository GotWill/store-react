import { CardProduct } from "@/components/card-product";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/products";
import { ArrowRight, RefreshCw, Shield, Sparkles, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import banner from "@/assets/modern-living-room-interior-design-elegant-furnitu.jpg";
import imgCategorieOne from "@/assets/masculino.png";
import imgCategorieTwo from "@/assets/eletronicos.png";
import imgCategorieThree from "@/assets/joias.png";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { productService } from "@/api/services/product";

export default function HomePage() {
  const { data: products } = useQuery({
    queryKey: ["products_home"],
    queryFn: async () => {
      const response = await productService.getAllProducts();
      return response.slice(0, 4) as Product[];
    },
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-block bg-secondary text-secondary-foreground text-sm font-medium px-4 py-1.5 rounded-full">
                Nova Coleção 2026
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight text-balance">
                Design que transforma seu{" "}
                <span className="text-primary">espaço</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                Descubra peças únicas e exclusivas que combinam elegância com
                funcionalidade. Curadoria especial para ambientes sofisticados.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/produtos">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                  >
                    Explorar Coleção
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border text-foreground hover:bg-secondary bg-transparent"
                >
                  Ver Ofertas
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-secondary">
                <img
                  src={banner}
                  alt="Ambiente decorado"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-lg border border-border">
                <p className="text-sm text-muted-foreground">Avaliação média</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-semibold text-foreground">
                    4.8
                  </span>
                  <div className="flex text-primary">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-primary">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Frete Grátis</h3>
                <p className="text-sm text-muted-foreground">
                  Em compras acima de R$ 299
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-primary">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Compra Segura</h3>
                <p className="text-sm text-muted-foreground">
                  Pagamento 100% protegido
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-primary">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Troca Fácil</h3>
                <p className="text-sm text-muted-foreground">
                  30 dias para devolução
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <span className="text-sm text-primary font-medium uppercase tracking-wide">
                Destaques
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mt-2">
                Produtos em Alta
              </h2>
            </div>
            <Link to="/produtos">
              <Button
                variant="ghost"
                className="text-primary hover:bg-secondary gap-2"
              >
                Ver todos
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products?.map((product) => (
              <CardProduct key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm text-primary font-medium uppercase tracking-wide">
              Explore
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mt-2">
              Nossas Categorias
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              to="/produtos?categories=men%27s+clothing"
              className="group relative overflow-hidden rounded-2xl"
            >
              <img
                src={imgCategorieOne}
                alt="Móveis"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="font-serif text-2xl font-semibold text-white">
                  Masculino
                </h3>
              </div>
            </Link>
            <Link
              to="/produtos?categories=electronics"
              className="group relative overflow-hidden rounded-2xl aspect-[4/3]"
            >
              <img
                src={imgCategorieTwo}
                alt="Iluminação"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="font-serif text-2xl font-semibold text-white">
                  Eletronicos
                </h3>
              </div>
            </Link>
            <Link
              to="/produtos?categories=jewelery"
              className="group relative overflow-hidden rounded-2xl aspect-[4/3]"
            >
              <img
                src={imgCategorieThree}
                alt="Decoração"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="font-serif text-2xl font-semibold text-white">
                  Joias
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground">
                  Receba novidades exclusivas
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Inscreva-se e ganhe 10% off na primeira compra
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Input type="email" placeholder="Seu melhor e-mail" />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap">
                Inscrever-se
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
