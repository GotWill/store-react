import z from "zod";

export const addressSchema = z.object({
  id: z.string().optional(),
  destination: z.string().nonempty("Campo obrigatório"),
  zipCode: z
    .string()
    .nonempty("Campo obrigatório")
    .min(8, { message: "minimo de 8 caracteres" }),
  phone: z.string().nonempty("Campo obrigatório"),
  street: z.string().nonempty("Campo obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().nonempty("Campo obrigatório"),
  city: z.string().nonempty("Campo obrigatório"),
  state: z.string().nonempty("Campo obrigatório"),
  isHabilty: z.boolean().optional(),
  number: z
    .number({ error: "Digite um número" })
    .min(1, "O número é obrigatório"),
  type: z.enum(["HOME", "WORKER"], {
    error: "Obrigatorio esoclher o tipo de resedencia",
  }),
});
