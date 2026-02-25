import { useCart } from "@/store/cart";
import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
function SuccessPage() {
  const { clearCart } = useCart((state) => state);

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="bg-slate-50 py-12 px-4 font-sans flex items-center justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 p-10 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6 shadow-lg shadow-green-500/20">
              <CheckCircle2 className="text-white w-12 h-12" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-3">
              Compra Concluída!
            </h1>
            <p className="text-slate-400 text-base">
              Obrigado por sua confiança. O processamento do seu pedido foi
              iniciado.
            </p>
          </div>

          {/* Conteúdo e Ações */}
          <div className="p-8 text-center">
            <p className="text-slate-600 mb-8">
              Tudo certo! Os detalhes desta etapa foram registrados com sucesso
              no seu perfil.
            </p>

            <div className="space-y-4">
              <Link
                to="/"
                className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                Início{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
