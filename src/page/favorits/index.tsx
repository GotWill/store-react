import { CardProduct } from "@/components/card-product";
import SkeletronProduct from "@/components/skeletron-product";
import { Button } from "@/components/ui/button";
import { db } from "@/config/firebase";
import { productConvert } from "@/converters/firestore";
import { useAuth } from "@/store/user";
import type { Product } from "@/types/products";
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import { ArrowRight, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FavoritsPage = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userAuth, isLoading: authLoading } = useAuth((state) => state);

  useEffect(() => {
    if (!userAuth?.uid) return;

    const q = query(
      collection(db, "favorits").withConverter(productConvert),
      where("user_id", "==", userAuth?.uid)
    );

    const unsubscribe = onSnapshot(q, (doc) => {
      const data: Product[] = [];
      doc.forEach((doc) => {
        data.push(doc.data());
      });
      setIsLoading(false);
      setFavorites(data);
    });

    return () => unsubscribe();
  }, [userAuth?.uid]);

  if (!userAuth && !authLoading) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center">
        <div className="w-full max-w-md mx-auto rounded-2xl bg-white p-8 text-center shadow-md">
          <p className="mb-6 text-gray-600">
            Você precisa estar logado para visualizar os produtos.
          </p>

          <Button>
            <Link to="/login?redirect_to=/favoritos">Ir para o login</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading || authLoading) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center">
        <div className="grid grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletronProduct key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {favorites.length > 0 && (
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
                Meus Favoritos
              </h1>
              <p className="text-muted-foreground text-sm">
                {favorites.length}{" "}
                {!isLoading && favorites.length === 1
                  ? "item salvo"
                  : "itens salvos"}
              </p>
            </div>
          </div>
        )}

        {!isLoading && favorites.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Sua lista de favoritos está vazia
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Explore nossa coleção e salve os produtos que você mais gostou
              para encontrá-los facilmente depois.
            </p>
            <Link to="/produtos">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Explorar Produtos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {!isLoading &&
              favorites.map((product) => (
                <CardProduct key={product.id} product={product} />
              ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default FavoritsPage;
