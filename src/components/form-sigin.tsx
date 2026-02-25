import { useSiginForm, type schemaSigin } from "@/forms/hooks/login";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { LoaderCircleIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useSigin } from "@/api/hooks/sigin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import type { SVGProps } from "react";

type FormSiginProps = {
  closeModal?: () => void;
};

export function FormSigin({ closeModal }: FormSiginProps) {
  const navigate = useNavigate()
  const form = useSiginForm();
  const {
    mutateHandleSigin: { mutate, isPending },
    handleSignInGoogle: { mutateAsync, isPending: isPendingGoogle },
  } = useSigin();
  const hanbdleLogin = async (data: schemaSigin) => {
    mutate(data, {
      onSuccess: () => {
        navigate("/")
      }
    });
  };

  const localtion = useLocation();

  async function handleGoogle() {
    try {
      await mutateAsync();
      closeModal?.();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(hanbdleLogin)}>
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
          <Button
            disabled={isPending}
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isPending ? (
              <>
                <LoaderCircleIcon className="animate-spin" /> Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </Button>
        </form>
      </Form>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-card px-4 text-muted-foreground">
            ou continue com
          </span>
        </div>
      </div>

      <Button onClick={handleGoogle} variant="outline" className="w-full">
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Google
      </Button>

      <p className="text-center text-sm text-muted-foreground mt-8">
        Não tem uma conta?{" "}
        <Link
          to="/criar-conta"
          className="text-primary font-medium hover:underline"
        >
          Criar conta
        </Link>
      </p>

      {isPendingGoogle && localtion.pathname !== "/checkout" && (
        <div className="fixed w-full h-full bg-black/35 inset-0 z-50 flex justify-center items-center text-white">
          <SvgSpinners3DotsBounce />
        </div>
      )}
    </>
  );
}

export function SvgSpinners3DotsBounce(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8em"
      height="8em"
      viewBox="0 0 24 24"
      {...props}
    >
      {/* Icon from SVG Spinners by Utkarsh Verma - https://github.com/n3r4zzurr0/svg-spinners/blob/main/LICENSE */}
      <circle cx="4" cy="12" r="3" fill="currentColor">
        <animate
          id="SVGKiXXedfO"
          attributeName="cy"
          begin="0;SVGgLulOGrw.end+0.25s"
          calcMode="spline"
          dur="0.6s"
          keySplines=".33,.66,.66,1;.33,0,.66,.33"
          values="12;6;12"
        />
      </circle>
      <circle cx="12" cy="12" r="3" fill="currentColor">
        <animate
          attributeName="cy"
          begin="SVGKiXXedfO.begin+0.1s"
          calcMode="spline"
          dur="0.6s"
          keySplines=".33,.66,.66,1;.33,0,.66,.33"
          values="12;6;12"
        />
      </circle>
      <circle cx="20" cy="12" r="3" fill="currentColor">
        <animate
          id="SVGgLulOGrw"
          attributeName="cy"
          begin="SVGKiXXedfO.begin+0.2s"
          calcMode="spline"
          dur="0.6s"
          keySplines=".33,.66,.66,1;.33,0,.66,.33"
          values="12;6;12"
        />
      </circle>
    </svg>
  );
}

// ::::;}
