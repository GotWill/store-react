import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schemaAddress } from "../schema/checkout";
import type z from "zod";

export type schemaAddress = z.infer<typeof schemaAddress>;

export function useFormChekout() {
  return useForm<schemaAddress>({
    resolver: zodResolver(schemaAddress),
    defaultValues: {
      address: "",
    },
  });
}
