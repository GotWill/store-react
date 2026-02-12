import { useForm } from "react-hook-form";
import { SignupSchema } from "../schema/signup";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export type SignupSchema = z.infer<typeof SignupSchema>;

export function useSignupForm() {
  return useForm<SignupSchema>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      isCheck: false,
    },
  });
}
