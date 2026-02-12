import { auth, db } from "@/config/firebase";
import type { createUser, CredentialUser } from "@/types/users";
import { createUserWithEmailAndPassword, type Auth } from "@firebase/auth";
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export class UserService {
  constructor(private auth: Auth, private db: Firestore) {}

  async verifyUser(email: string | null) {
    const userRef = collection(this.db, "users");
    const userQuery = query(userRef, where("email", "==", email));

    const querySnapshot = await getDocs(userQuery);

    return !querySnapshot.empty;
  }

  async createUser(user: createUser) {
    const createUser = await createUserWithEmailAndPassword(
      this.auth,
      user.email,
      user.password
    );
    const data = this.createDocForUser({
      uid: createUser.user.uid,
      displayName: `${user.firstName} ${user.lastName}`,
      email: user.email,
      photoURL: "",
    });

    return data;
  }

  async createDocForUser(user: CredentialUser) {
    const firstName = user.displayName?.split(" ")[0];
    const lastName = user.displayName?.split(" ")[1];

    const data = await addDoc(collection(this.db, "users"), {
      id: user.uid,
      name: firstName,
      lastName: lastName,
      email: user.email,
      imageUrl: user.photoURL,
    });

    return data;
  }

  async updateUser(adressId: string, docId: string) {
    await updateDoc(doc(db, "users", docId), {
      defaultAddressId: adressId,
    });
  }
}

export const userService = new UserService(auth, db);
