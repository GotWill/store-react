import { userService } from "@/api/services/user";
import { auth } from "@/config/firebase";
import { useSignupForm, type SignupSchema } from "@/forms/hooks/signup";
import {
  AuthErrorCodes,
  GoogleAuthProvider,
  signInWithPopup,
  type AuthError,
} from "@firebase/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useSignup() {
  const google = new GoogleAuthProvider();
  const navigate = useNavigate();

  const form = useSignupForm();

  const { mutate: MutationForm, isPending } = useMutation({
    mutationKey: ["create_user"],
    mutationFn: async (user: SignupSchema) => {
      const data = await userService.createUser(user);
      return data;
    },
    onSuccess: () => {
      navigate("/");
    },
    onError: (erro) => {
      const _error = erro as AuthError;

      if (_error.code === AuthErrorCodes.EMAIL_EXISTS) {
        toast.error("E-mail ja existe");
      }
    },
  });

  const { mutate: handleLoginGoogle } = useMutation({
    mutationKey: ["signin_google"],
    mutationFn: async () => {
      const credential = await signInWithPopup(auth, google);

      const userExisting = await userService.verifyUser(credential.user.email);

      if (!userExisting) {
        const createUserFirestore = await userService.createDocForUser(
          credential.user
        );

        return createUserFirestore;
      }
    },
  });

  async function handleSignInGoogle() {
    handleLoginGoogle(undefined, {
      onSuccess: () => {
        navigate("/");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }

  return {
    isPending,
    form,
    navigate,
    handleSignInGoogle,
    MutationForm,
  };
}
