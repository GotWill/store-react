import { db } from "@/config/firebase";
import { addressConvert } from "@/converters/firestore";
import { useFormChekout } from "@/forms/hooks/checkout";
import { useCart } from "@/store/cart";
import { useAuth } from "@/store/user";
import type { AdressFromFirestore } from "@/types/address";
import {
  query,
  collection,
  orderBy,
  where,
  onSnapshot,
} from "@firebase/firestore";
import axios from "axios";
import { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useCheckout() {
  const { cart } = useCart((state) => state);
  const { userAuth, user } = useAuth((state) => state);
  const [addresses, setAdresses] = useState<AdressFromFirestore[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  const navigate = useNavigate();

  const form = useFormChekout();

  const { setValue } = form;

  const selectedOption = useWatch({
    name: "address",
    control: form.control,
  });

  useEffect(() => {
    if (!userAuth) return;

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

      setAdresses(data);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [userAuth, user]);

  useEffect(() => {
    const defaultAddress = addresses.find(
      (item) => item.id === user?.defaultAddressId
    );

    if (defaultAddress) {
      setValue("address", `${defaultAddress?.id}`);
    }
  }, [addresses, setValue, user]);

  async function handleFinishedCheckout() {
    console.log(selectedOption);

    if (!userAuth) {
      setDialogOpen(true);
      return;
    }

    if (!selectedOption) {
      toast.error("Por favor, escolha um endereço para concluir seu pedido.");
      return;
    }

    const { data } = await axios.post(
      "http://localhost:3333/create-session",
      cart
    );

    navigate(data);
  }

  return {
    isLoading,
    dialogOpen,
    userAuth,
    cart,
    form,
    addresses,
    setDialogOpen,
    navigate,
    handleFinishedCheckout,
  };
}
