import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, SquarePen } from "lucide-react";
import FormUsuario from "./form-usuario";
import type { Usuario } from "@/lib/generated/aiusce";

export default function ModalUpdateAndCreate({
  isUpdating,
  user,
}: {
  isUpdating: boolean;
  user?: Partial<Usuario>;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className={`${
            isUpdating
              ? "bg-background hover:bg-primary"
              : "bg-primary hover:bg-primary hover:opacity-70"
          } group transition-all ease-linear duration-200`}>
          {isUpdating ? (
            <SquarePen size={28} className="text-primary group-hover:text-white" />
          ) : (
            <Plus size={28} className="text-white" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isUpdating ? "Editar" : "Adicionar"} Usuário</DialogTitle>
          <DialogDescription>
            {isUpdating ? "Altere os dados do usuário." : "Preencha os dados do novo usuário administrativo."}
          </DialogDescription>
        </DialogHeader>
        <FormUsuario user={user} isUpdating={isUpdating} />
      </DialogContent>
    </Dialog>
  );
}
