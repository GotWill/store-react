/* eslint-disable @typescript-eslint/no-explicit-any */
import type z from "zod";
import { addressSchema } from "../schema/upsert-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AdressFromFirestore } from "@/types/address";
import type { User } from "@/types/users";

export type schema = z.infer<typeof addressSchema>;

export function useUpsertForm(
  address?: AdressFromFirestore,
  user?: User | null
) {
  return useForm<schema>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      id: address?.id ?? "",
      destination: address?.destination ?? "",
      zipCode: address?.zipCode ?? "",
      street: address?.street ?? "",
      complement: address?.complement ?? "",
      neighborhood: address?.neighborhood ?? "",
      city: address?.city ?? "",
      phone: address?.phone ?? "",
      state: address?.state ?? "",
      number: address?.number ?? ("" as any),
      isHabilty:
        address && address?.id === user?.defaultAddressId ? true : false,
      type: address?.type ?? undefined,
    },
  });
}
