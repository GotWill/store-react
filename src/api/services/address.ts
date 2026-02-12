import { db } from "@/config/firebase";
import { addressConvert } from "@/converters/firestore";
import type { AdressFromFirestore } from "@/types/address";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";
import { v4 as uuidv4 } from "uuid";

class AddressService {
  constructor() {}

  async getAddress(id: string) {
    const addressQuery = query(
      collection(db, "address").withConverter(addressConvert),
      where("id", "==", id)
    );

    return (await getDocs(addressQuery)).docs[0].id;
  }

  async delete(id: string) {
    const address = await this.getAddress(id);
    await deleteDoc(doc(db, "address", address));
  }

  async getDocAddress(docId: string) {
    const docRef = doc(db, "address", docId);
    const docSnap = await getDoc(docRef);
    return docSnap.data() as AdressFromFirestore;
  }

  async upsert(address: AdressFromFirestore, user_id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { isHabilty, ...payload } = address;

    if (address.id) {
      const querySnapshotId = await this.getAddress(address.id);

      await updateDoc(doc(db, "address", querySnapshotId), {
        ...payload,
      });

      return address.id;
    }

    const newAddress = await addDoc(collection(db, "address"), {
      ...payload,
      createdAt: new Date().toISOString(),
      user_id,
      id: uuidv4(),
    });

    const getAddress = await this.getDocAddress(newAddress.id);

    return getAddress.id as string;
  }
}

export const addressService = new AddressService();
