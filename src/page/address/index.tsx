import { Button } from "@/components/ui/button";
import { db } from "@/config/firebase";
import { addressConvert } from "@/converters/firestore";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "@firebase/firestore";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import Address from "./components/address";
import type { AdressFromFirestore } from "@/types/address";
import { Link } from "react-router-dom";
import Skeletron from "./components/skeletron";
import { useAuth } from "@/store/user";
import { DialogAddress } from "./components/dialog-address";

export default function AddressPage() {
  const { userAuth, isLoading: authLoading } = useAuth((state) => state);
  const [addresses, setAddresses] = useState<AdressFromFirestore[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userAuth?.uid) return;

    const q = query(
      collection(db, "address").withConverter(addressConvert),
      orderBy("createdAt", "desc"),
      where("user_id", "==", userAuth?.uid)
    );
    const unsubscribe = onSnapshot(q, (doc) => {
      const data: AdressFromFirestore[] = [];
      doc.forEach((doc) => {
        data.push(doc.data());
      });
      setIsLoading(false);
      setAddresses(data);
    });

    return () => unsubscribe();
  }, [userAuth]);

  if (!userAuth && !authLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md mx-auto rounded-2xl bg-white p-8 text-center shadow-md">
          <p className="mb-6 text-gray-600">
            Você precisa estar logado para visualizar seus endereços.
          </p>

          <Button>
            <Link to="/login?redirect_to=/enderecos">Ir para o login</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading || authLoading) {
    return (
      <div className="flex flex-1 justify-center items-center px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-4xl mx-auto">
          <Skeletron />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <main
        className={`w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8  ${
          !userAuth ? "flex  justify-center items-center " : ""
        }`}
      >
        {!isLoading && userAuth && addresses?.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
                Meus Endereços
              </h1>
              <p className="text-muted-foreground mt-2">
                Gerencie seus endereços de entrega
              </p>
            </div>
            <DialogAddress />
          </div>
        )}

        <div className="flex flex-col gap-4">
          {userAuth &&
            addresses?.map((item) => <Address key={item.id} address={item} />)}
        </div>

        {addresses?.length === 0 && (
          <div className="text-center">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Nenhum endereço cadastrado
            </h2>
            <p className="text-muted-foreground mb-6">
              Adicione um endereço para facilitar suas compras
            </p>
            <DialogAddress />
          </div>
        )}
      </main>
    </div>
  );
}
