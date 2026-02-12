import { addressService } from "@/api/services/address";
import { userService } from "@/api/services/user";
import { db } from "@/config/firebase";
import { useAuth } from "@/store/user";
import type { AdressFromFirestore } from "@/types/address";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";
import { useState } from "react";
import { toast } from "sonner";

export function useAddress(address: AdressFromFirestore) {
  const [openDilaog, setIsOpenDialog] = useState(false);
  const { user, userAuth } = useAuth((state) => state);

  async function handleDelete() {
    await addressService.delete(address.id as string);
    if (address.id === user?.defaultAddressId) {
      await userService.updateUser("", user?.idDoc as string);
    }
    toast.success("Endereço deletado");
  }

  async function handleIsHabilityAddress() {
    const getUser = query(
      collection(db, "users"),
      where("id", "==", userAuth?.uid)
    );

    const querySnapshotId = (await getDocs(getUser)).docs[0].id;
    return await updateDoc(doc(db, "users", querySnapshotId), {
      defaultAddressId: address.id,
    });
  }

  return {
    openDilaog,
    user,
    setIsOpenDialog,
    handleDelete,
    handleIsHabilityAddress,
  };
}
