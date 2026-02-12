import { addressService } from "@/api/services/address";
import { userService } from "@/api/services/user";
import { useUpsertForm, type schema } from "@/forms/hooks/upsert-address";
import { useAuth } from "@/store/user";
import type {
  Address,
  AdaptedAddress,
  AdressFromFirestore,
} from "@/types/address";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useWatch } from "react-hook-form";
import { toast } from "sonner";

export function useUpsert(address?: AdressFromFirestore) {
  const { user, userAuth } = useAuth((state) => state);

  const form = useUpsertForm(address, user);

  const { setValue, control } = form;

  const zipCode = useWatch({
    control: control,
    name: "zipCode",
  });

  const { data, isError } = useQuery({
    queryKey: ["zipcodee", zipCode],
    enabled: zipCode?.length === 8,
    retry: false,
    queryFn: async () => {
      const response = await axios.get(
        `https://viacep.com.br/ws/${zipCode}/json/`
      );

      if (response.data.erro) {
        throw new Error("CEP inexistente");
      }

      const raw: Address = response.data;

      const address: AdaptedAddress = {
        city: raw.localidade,
        neighborhood: raw.bairro,
        street: raw.logradouro,
        state: raw.estado,
      };

      return address;
    },
  });

  useEffect(() => {
    if (isError) {
      toast.error("CEP invalido");
      setValue("city", "");
      setValue("state", "");
      setValue("neighborhood", "");
      setValue("street", "");
    }

    if (data) {
      setValue("city", data.city);
      setValue("state", data.state);
      setValue("neighborhood", address?.neighborhood ?? data.neighborhood);
      setValue("street", data.street);
    }
  }, [isError, data, setValue, address?.neighborhood]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["upsert_address", userAuth?.uid],
    mutationFn: async (address: schema) => {
      const addressId = await addressService.upsert(
        address,
        userAuth?.uid as string
      );

      if (address.isHabilty) {
        await userService.updateUser(addressId, user?.idDoc as string);
      }
    },
  });

  return {
    form,
    isPending,
    user,
    mutate,
  };
}
