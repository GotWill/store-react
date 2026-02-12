import { auth, db } from "@/config/firebase";
import { useAuth } from "@/store/user";
import type { User } from "@/types/users";
import { onAuthStateChanged } from "@firebase/auth";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "@firebase/firestore";
import { useEffect, type ReactNode } from "react";

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const {
    isAutenticated,
    userAuth,
    setIsloading,
    logout,
    setUserAuth,
    setUser,
  } = useAuth((state) => state);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setIsloading(false);

      if (isAutenticated && !userAuth) {
        logout();
        setIsloading(false);
      }

      if (user && !isAutenticated) {
        setUserAuth({
          uid: user.uid,
          email: user.email as string,
        });
        return setIsloading(false);
      }
      setIsloading(false);
    });
  }, []);

  useEffect(() => {
    if (!userAuth?.uid) return;
    const q = query(collection(db, "users"), where("id", "==", userAuth?.uid));

    const unsub = onSnapshot(q, async (snapshot) => {
      const querySnapshot = (await getDocs(q)).docs[0]?.id;

      if (!snapshot.empty) {
        const userData = snapshot.docs[0].data();
        setUser({ ...(userData as User), idDoc: querySnapshot });
      }
    });

    return () => unsub();
  }, [userAuth?.uid]);

  return children;
}
