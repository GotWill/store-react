import { FormSigin } from "@/components/form-sigin";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
type DialogProps = {
  dialogOpen: boolean;
  setDialogOpen: () => void;
};

export function DialogAccount({ dialogOpen, setDialogOpen }: DialogProps) {
  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Olá!</DialogTitle>
            <DialogDescription className="text-center">
              Acesse a sua conta para continuar, assim você tem uma experiência
              personalizada e aproveita melhor a nossa loja on-line
            </DialogDescription>
          </DialogHeader>
          <FormSigin closeModal={setDialogOpen} />
        </DialogContent>
      </Dialog>
    </>
  );
}
