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
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { BASE_PATH } from "@/lib/config";
import { z } from "zod";
import type { Usuario } from "@/lib/generated/aiusce";

const schemaLogin = z.object({
  login: z.string().min(1, "Informe o login"),
});

const schemaUsuario = z.object({
  nome: z.string().min(1),
  login: z.string().min(1),
  email: z.string().email(),
  permissao: z.enum(["DEV", "ADM", "USR"]),
});

export default function FormUsuario({
  isUpdating,
  user,
}: {
  isUpdating: boolean;
  user?: Partial<Usuario>;
}) {
  const [isPending, startTransition] = useTransition();

  const formLogin = useForm<z.infer<typeof schemaLogin>>({
    resolver: zodResolver(schemaLogin),
    defaultValues: { login: "" },
  });

  const formUsuario = useForm<z.infer<typeof schemaUsuario>>({
    resolver: zodResolver(schemaUsuario),
    defaultValues: {
      email: user?.email ?? "",
      login: user?.login ?? "",
      nome: user?.nome ?? "",
      permissao: (user?.permissao as "DEV" | "ADM" | "USR") ?? "USR",
    },
  });

  async function onBuscarLogin(values: z.infer<typeof schemaLogin>) {
    const resp = await fetch(
      `${BASE_PATH}/api/aiusce/usuarios/buscar-por-login/${values.login}`,
    );
    if (resp.status !== 200) {
      toast.error("Usuário não encontrado");
      return;
    }
    const usuario = await resp.json();
    if (usuario) {
      toast.success("Usuário encontrado", { description: usuario.nome });
      formUsuario.setValue("nome", usuario.nome);
      formUsuario.setValue("email", usuario.email);
      formUsuario.setValue("login", usuario.login);
    }
  }

  function onSubmitUsuario(values: z.infer<typeof schemaUsuario>) {
    startTransition(async () => {
      if (isUpdating && user?.id) {
        const resp = await fetch(`${BASE_PATH}/api/aiusce/usuarios/${user.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ permissao: values.permissao }),
        });
        if (!resp.ok) {
          const erro = await resp.json();
          toast.error(erro.error ?? "Erro ao atualizar usuário.");
          return;
        }
        toast.success("Usuário atualizado.");
      } else {
        const resp = await fetch(`${BASE_PATH}/api/aiusce/usuarios`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (!resp.ok) {
          const erro = await resp.json();
          toast.error(erro.error ?? "Erro ao criar usuário.");
          return;
        }
        toast.success("Usuário criado.");
      }
      document.getElementById("close-dialog-aiusce")?.click();
      window.location.reload();
    });
  }

  return (
    <>
      {!isUpdating && (
        <Form {...formLogin}>
          <form
            onSubmit={formLogin.handleSubmit(onBuscarLogin)}
            className="flex items-end gap-2 w-full mb-5"
          >
            <FormField
              control={formLogin.control}
              name="login"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Login de rede</FormLabel>
                  <FormControl>
                    <Input placeholder="Login do usuário" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={formLogin.formState.isSubmitting || !formLogin.formState.isValid}
              type="submit"
            >
              {formLogin.formState.isSubmitting ? (
                <>Buscar <Loader2 className="animate-spin" /></>
              ) : (
                <>Buscar <ArrowRight /></>
              )}
            </Button>
          </form>
        </Form>
      )}

      <Form {...formUsuario}>
        <form onSubmit={formUsuario.handleSubmit(onSubmitUsuario)} className="space-y-4">
          <FormField
            control={formUsuario.control}
            name="login"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Login de rede</FormLabel>
                <FormControl>
                  <Input disabled placeholder="Login do usuário" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formUsuario.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input disabled placeholder="Nome do usuário" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formUsuario.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input disabled type="email" placeholder="E-mail do usuário" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formUsuario.control}
            name="permissao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Permissão</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Defina a permissão" />
                    </SelectTrigger>
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
            <DialogClose id="close-dialog-aiusce" asChild>
              <Button variant="outline" type="button">Voltar</Button>
            </DialogClose>
            <Button disabled={isPending} type="submit">
              {isUpdating ? (
                <>Atualizar {isPending && <Loader2 className="animate-spin" />}</>
              ) : (
                <>Adicionar {isPending && <Loader2 className="animate-spin" />}</>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
