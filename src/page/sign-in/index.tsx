import { FormSigin } from "@/components/form-sigin";

export default function SignIn() {
  return (
    <div className="bg-background flex flex-col">
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-foreground font-bold text-lg">
                  L
                </span>
              </div>
              <h1 className="font-serif text-2xl font-semibold text-foreground">
                Bem-vindo de volta
              </h1>
              <p className="text-muted-foreground mt-2">
                Entre na sua conta para continuar
              </p>
            </div>

            <FormSigin />
          </div>
        </div>
      </main>
    </div>
  );
}
