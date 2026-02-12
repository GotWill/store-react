import z from "zod";

export const SignupSchema = z
  .object({
    firstName: z.string().nonempty({ message: "Campo obrigatorio" }),
    lastName: z.string().nonempty({ message: "Campo obrigatorio" }),
    email: z.string().email({ message: "E-mail invalido" }),
    password: z
      .string()
      .min(6, { message: "Senha deve ter no minimo 6 caracteres" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Senha deve ter no minimo 6 caracteres" }),
    isCheck: z
      .boolean()
      .refine((data) => data === true, { message: "Campo obrigatorio" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
  });
