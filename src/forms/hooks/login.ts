import type z from "zod";
import { siginSchema } from "../schema/login";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export type schemaSigin = z.infer<typeof siginSchema>;

export function useSiginForm() {
  return useForm<schemaSigin>({
    resolver: zodResolver(siginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
}
