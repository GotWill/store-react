import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { AdressFromFirestore } from "@/types/address";
import { DialogClose, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { Building2, HomeIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useUpsert } from "../hooks/useUpsert";
import type { schema } from "@/forms/hooks/upsert-address";
import { toast } from "sonner";
import { PatternFormat } from "react-number-format";

type UpsertAddressProps = {
  address?: AdressFromFirestore | undefined;
  onClick?: () => void;
};

const UpsertAddress = ({ address, onClick }: UpsertAddressProps) => {
  const { form, isPending, mutate, user } = useUpsert(address);

  async function handleCreateAddress(address: schema) {
    mutate(address, {
      onSuccess: () => {
        onClick?.();
        toast.success(
          `${
            address.id
              ? "Endereço atulizado com successo!"
              : "Endereço criado com successo!"
          }`
        );
      },
      onError: () => {
        toast.error("Erro, tente novamente mais tarde");
      },
    });
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-6">
      <DialogTitle className="font-semibold text-lg text-foreground mb-6">
        {address ? `Editando` : "Adicionar Novo Endereço"}
      </DialogTitle>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCreateAddress)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Destinatário</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="00000000"
                      {...field}
                      maxLength={9}
                      onChange={(e) => {
                        const value = e.target.value;
                        form.setValue(
                          "zipCode",
                          value.replace(/\D/g, "").slice(0, 8)
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <PatternFormat
                      format="(##) #####-####"
                      mask="_"
                      placeholder="(11) 99999-9999"
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value.value);
                      }}
                      customInput={Input}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rua</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da rua e número" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numero</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Nome da rua e número"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        form.setValue(
                          "number",
                          Number(value.replace(/\D/g, ""))
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="complement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complemento</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Apto, Bloco, etc. (opcional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="neighborhood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input placeholder="Bairro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Cidade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Estado" {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <FormField
              control={form.control}
              name="isHabilty"
              render={({ field }) => (
                <FormItem className="flex">
                  <FormControl>
                    <Checkbox
                      disabled={
                        address && address?.id === user?.defaultAddressId
                      }
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Definir como endereço padrão</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            <p>Este é o seu trabalho ou sua casa?</p>

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <RadioGroup
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormItem>
                    <FormControl>
                      <div className="flex gap-2">
                        <RadioGroupItem
                          value="HOME"
                          onChange={() => field.onChange("HOME")}
                          id="HOME"
                        />
                        <Label htmlFor="HOME">
                          <HomeIcon size={18} /> Casa
                        </Label>
                      </div>
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormControl>
                      <div className="flex gap-2">
                        <RadioGroupItem
                          value="WORKER"
                          id="WORKER"
                          onChange={() => field.onChange("WORKER")}
                        />
                        <Label htmlFor="WORKER">
                          <Building2 size={18} /> Trabalho
                        </Label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </RadioGroup>
              )}
            />
          </div>
          <DialogFooter className="flex gap-4 mt-6">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-border text-foreground hover:bg-secondary bg-transparent"
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
              {isPending && <Spinner />}
              {address ? "Atulizar endereço" : "Salvar Endereço"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
};

export default UpsertAddress;
