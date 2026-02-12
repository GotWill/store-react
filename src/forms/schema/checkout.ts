import z from "zod";

export const schemaAddress = z.object({
  address: z.string(),
});
