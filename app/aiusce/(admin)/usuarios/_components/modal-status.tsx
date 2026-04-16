"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { atualizarUsuarioAiusce } from "@/services/usuario-aiusce";
import { Check, Loader2, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export default function ModalStatus({ id, status }: { id: string; status: boolean }) {
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    startTransition(async () => {
      const resp = await atualizarUsuarioAiusce(id, { status });
      if (!resp) {
        toast.error("Algo deu errado.");
      } else {
        toast.success(status ? "Usuário ativado." : "Usuário desativado.");
        window.location.reload();
      }
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className={`${status ? "hover:bg-primary" : "hover:bg-destructive"} cursor-pointer hover:text-white transition-all ease-linear duration-200`}>
          {status ? (
            <Check size={24} className="text-primary group-hover:text-white" />
          ) : (
            <Trash2 size={24} className="text-destructive group-hover:text-white" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{status ? "Ativar Usuário" : "Desativar Usuário"}</DialogTitle>
        </DialogHeader>
        <p>{status ? "Tem certeza que deseja ativar este usuário?" : "Tem certeza que deseja desativar este usuário?"}</p>
        <DialogFooter>
          <div className="flex gap-2">
            <DialogClose asChild>
              <Button variant="outline">Voltar</Button>
            </DialogClose>
            <Button
              disabled={isPending}
              onClick={handleToggle}
              variant={status ? "default" : "destructive"}>
              {isPending ? <Loader2 className="animate-spin" /> : status ? "Ativar" : "Desativar"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
