"use client";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { criarUsuarioAiusce, atualizarUsuarioAiusce } from "@/services/usuario-aiusce";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import type { Usuario } from "@/lib/generated/aiusce";

const schema = z.object({
  nome: z.string().min(2, "Nome obrigatório"),
  email: z.string().email("E-mail inválido"),
  login: z.string().optional(),
  permissao: z.enum(["DEV", "ADM", "USR"]),
});

type FormValues = z.infer<typeof schema>;

export default function FormUsuario({
  isUpdating,
  user,
}: {
  isUpdating: boolean;
  user?: Partial<Usuario>;
}) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: user?.nome ?? "",
      email: user?.email ?? "",
      login: user?.login ?? "",
      permissao: (user?.permissao as "DEV" | "ADM" | "USR") ?? "USR",
    },
  });

  function onSubmit(values: FormValues) {
    startTransition(async () => {
      if (isUpdating && user?.id) {
        const resp = await atualizarUsuarioAiusce(user.id, {
          nome: values.nome,
          email: values.email,
          login: values.login || undefined,
          permissao: values.permissao,
        });
        if (!resp) {
          toast.error("Erro ao atualizar usuário.");
          return;
        }
        toast.success("Usuário atualizado.");
      } else {
        const resp = await criarUsuarioAiusce({
          nome: values.nome,
          email: values.email,
          login: values.login || undefined,
          permissao: values.permissao,
        });
        if (!resp) {
          toast.error("Erro ao criar usuário.");
          return;
        }
        toast.success("Usuário criado.");
      }
      document.getElementById("close-dialog")?.click();
      window.location.reload();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl><Input placeholder="Nome completo" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl><Input type="email" placeholder="email@prefeitura.sp.gov.br" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="login"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Login de rede <span className="text-muted-foreground text-xs">(opcional)</span></FormLabel>
              <FormControl><Input placeholder="ex: d927014" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="permissao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Permissão</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger><SelectValue placeholder="Selecione a permissão" /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="DEV">Desenvolvedor</SelectItem>
                  <SelectItem value="ADM">Administrador</SelectItem>
                  <SelectItem value="USR">Usuário</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 items-center justify-end">
          <DialogClose id="close-dialog" asChild>
            <Button variant="outline" type="button">Voltar</Button>
          </DialogClose>
          <Button disabled={isPending} type="submit">
            {isPending ? <Loader2 className="animate-spin" /> : isUpdating ? "Atualizar" : "Adicionar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
