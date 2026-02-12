import { auth } from "@/config/firebase";
import type { schemaSigin } from "@/forms/hooks/login";
import {
  AuthErrorCodes,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  type AuthError,
} from "@firebase/auth";
import { useMutation } from "@tanstack/react-query";
import { userService } from "../services/user";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export function useSigin() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const url = searchParams.get("redirect_to") ?? "/";
  const localtion = useLocation();

  const google = new GoogleAuthProvider();

  const siginMutation = useMutation({
    mutationKey: ["signin"],
    mutationFn: async (data: schemaSigin) => {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      return userCredential;
    },
    onError: (erro) => {
      const _error = erro as AuthError;

      if (_error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
        toast.error("Dados invalidos");
      }
    },
  });

  const mutateGoogle = useMutation({
    mutationKey: ["signin-google"],
    mutationFn: async () => {
      const userCredential = await signInWithPopup(auth, google);
      const userExisting = await userService.verifyUser(
        userCredential.user.email
      );

      if (!userExisting) {
        await userService.createDocForUser(userCredential.user);
      }
    },
    onSuccess: () => {
      if (localtion.pathname !== "/checkout") {
        navigate(url);
      }
    },
  });


  return {
    mutateHandleSigin: siginMutation,
    handleSignInGoogle: mutateGoogle,
  };
}
