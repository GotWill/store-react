import { db } from "@/config/firebase";
import type { Product } from "@/types/products";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "@firebase/firestore";
import { toast } from "sonner";

interface useFavoritesProps {
  product: Product;
  userId: string | undefined;
}

export function useFavorites({ product, userId }: useFavoritesProps) {
  async function handleToggleFavorite() {
    if (!userId) {
      toast.warning("Por favor, faça login para prosseguir.");
      return;
    }
    const favoritsRef = collection(db, "favorits");

    const q = query(
      favoritsRef,
      where("id", "==", product.id),
      where("user_id", "==", userId)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.docs[0]?.exists()) {
      await addDoc(favoritsRef, {
        ...product,
        user_id: userId,
      });

      return toast.success("Produto favoritado");
    }

    await deleteDoc(doc(db, "favorits", querySnapshot.docs[0].id));
    toast.success("Produto removido dos favoritos");
  }

  return {
    handleToggleFavorite,
  };
}
