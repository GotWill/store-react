import { Button } from "@/components/ui/button";
import type { AdressFromFirestore } from "@/types/address";
import { Building2, Home, Pencil, Star, Trash2 } from "lucide-react";
import UpsertAddress from "./upsert-address";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAddress } from "../hooks/useAddress";

type AddressProps = {
  address: AdressFromFirestore;
};
const Address = ({ address }: AddressProps) => {
  const {
    openDilaog,
    user,
    handleDelete,
    handleIsHabilityAddress,
    setIsOpenDialog,
  } = useAddress(address);

  function FormatMask(value: string) {
    return value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }

  return (
    <div
      key={address.id}
      className={`bg-card border rounded-xl p-6 relative ${
        address.id === user?.defaultAddressId
          ? "border-primary"
          : "border-border"
      }`}
    >
      {address.id === user?.defaultAddressId && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
          <Star className="w-3.5 h-3.5 fill-primary" />
          Padrão
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center shrink-0">
          {address.type === "HOME" ? (
            <Home className="w-6 h-6 text-primary" />
          ) : (
            <Building2 className="w-6 h-6 text-primary" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-muted-foreground mt-2">
            {address.street}
            {address.complement && `, ${address.complement}`}
          </p>
          <p className="text-muted-foreground">
            {address.neighborhood} - {address.city}, {address.state}
          </p>
          <p className="text-muted-foreground">CEP: {address.zipCode}</p>
          <p className="text-muted-foreground">
            Tel: {FormatMask(address.phone)}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-border">
        <Dialog open={openDilaog} onOpenChange={setIsOpenDialog}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="border-border text-foreground hover:bg-secondary bg-transparent"
            >
              <Pencil className="w-4 h-4 mr-2" />
              Editar
            </Button>
          </DialogTrigger>
          <DialogContent>
            <UpsertAddress
              address={address}
              onClick={() => setIsOpenDialog(false)}
            />
          </DialogContent>
        </Dialog>

        {address.id !== user?.defaultAddressId && (
          <Button
            variant="outline"
            size="sm"
            className="border-border text-foreground hover:bg-secondary bg-transparent"
            onClick={handleIsHabilityAddress}
          >
            <Star className="w-4 h-4 mr-2" />
            Definir como Padrão
          </Button>
        )}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="border-destructive text-destructive hover:bg-destructive/10 bg-transparent"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Tem certeza que deseja excluir?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Essa ação depois de realizada não pode ser desfeita
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancela</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Continuar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Address;
