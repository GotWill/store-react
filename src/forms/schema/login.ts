import z from "zod";

export const siginSchema = z.object({
  email: z.email({ message: "E-mail invalido" }),
  password: z
    .string()
    .min(6, { message: "Senha deve ter no minimo 6 caracteres" }),
});
