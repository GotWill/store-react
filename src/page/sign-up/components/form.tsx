import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoaderCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import type { SignupSchema } from "@/forms/hooks/signup";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function SignupForm() {
  const { form, isPending, MutationForm } = useSignup();

  async function sendForm(user: SignupSchema) {
    MutationForm(user);
  }

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(sendForm)}>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sobrenome</FormLabel>
                <FormControl>
                  <Input placeholder="Sobrenome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="E-mail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Confirmar Senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Repita a senha"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isCheck"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="terms"
                  />
                  <Label className="leading-4.5" htmlFor="terms">
                    Concordo com os{" "}
                    <Link
                      to="#"
                      className="text-primary hover:underline contents"
                    >
                      Termos de Uso
                    </Link>{" "}
                    e{" "}
                    <Link
                      to="#"
                      className="text-primary hover:underline contents"
                    >
                      Política de Privacidade
                    </Link>
                  </Label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <LoaderCircleIcon className="animate-spin" /> Criando conta...{" "}
            </>
          ) : (
            "Criar Conta"
          )}
        </Button>
      </form>
    </Form>
  );
}
