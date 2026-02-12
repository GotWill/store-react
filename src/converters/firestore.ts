import type { AdressFromFirestore } from "@/types/address";
import type { Product } from "@/types/products";
import type { User, UserAuth } from "@/types/users";
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export const userConvert = {
  toFirestore(user: User): DocumentData {
    return { ...user };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): User {
    const data = snapshot.data();
    return {
      firstName: data.name,
      lastName: data.lastName,
      email: data.email,
      imageUrl: data.imageUrl,
      defaultAddressId: data.defaultAddressId,
      idDoc: data.idDoc,
    };
  },
};

export const userAuthConvert = {
  toFirestore(userAuth: UserAuth): DocumentData {
    return { ...userAuth };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): UserAuth {
    const data = snapshot.data();
    return {
      uid: data.id,
      email: data.email,
    };
  },
};

export const addressConvert = {
  toFirestore(address: AdressFromFirestore): DocumentData {
    return { ...address };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): AdressFromFirestore {
    const data = snapshot.data();
    return {
      id: data.id,
      city: data.city,
      complement: data.complement,
      isHabilty: data.isHabilty,
      neighborhood: data.neighborhood,
      number: data.number,
      phone: data.phone,
      state: data.state,
      street: data.street,
      zipCode: data.zipCode,
      destination: data.destination,
      type: data.type,
    };
  },
};

export const productConvert = {
  toFirestore(product: Product): DocumentData {
    return { ...product };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Product {
    const data = snapshot.data();
    return {
      id: data.id,
      title: data.title,
      category: data.category,
      description: data.description,
      image: data.image,
      price: data.price,
      rating: data.rating,
    };
  },
};
