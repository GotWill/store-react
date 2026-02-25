import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import UpsertAddress from "./upsert-address";
import { useState } from "react";

export function DialogAddress() {
  const [openDilaog, setIsOpenDialog] = useState<boolean>(false);

  return (
    <Dialog open={openDilaog} onOpenChange={setIsOpenDialog}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsOpenDialog(!openDilaog)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
          data-testid='Novo Endereço'
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Endereço
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[800px]">
        <UpsertAddress onClick={() => setIsOpenDialog(false)} />
      </DialogContent>
    </Dialog>
  );
}
