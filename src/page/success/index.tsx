import { CheckCircle2, ShoppingBag } from "lucide-react";

// Utilizando a estrutura de função tradicional (Function Declaration)
function SuccessPage() {
  const purchasedProducts = [
    {
      id: 1,
      title: "Relógio Chronos Black Edition - Pulseira de Couro",
      category: "Joias",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200&h=200&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Fone de Ouvido Noise Cancelling Bluetooth 5.3",
      category: "Eletrônicos",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&h=200&auto=format&fit=crop",
    },
  ];

  return (
    <div className="bg-slate-50 py-12 px-4 font-sans">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4 shadow-lg shadow-green-500/20">
              <CheckCircle2 className="text-white w-10 h-10" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Pedido Finalizado!
            </h1>
            <p className="text-slate-400 text-sm">
              Sua compra foi concluída com sucesso.
            </p>
          </div>

          <div className="p-8">
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
              <ShoppingBag className="w-5 h-5 text-slate-500" />
              <h2 className="font-semibold text-slate-800">Itens Adquiridos</h2>
            </div>

            <div className="grid gap-4">
              {purchasedProducts.map(function (product) {
                return (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100"
                  >
                    <div className="h-20 w-20 flex-shrink-0 bg-slate-100 rounded-xl overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        {product.category}
                      </span>
                      <h3 className="text-sm font-semibold text-slate-900 truncate">
                        {product.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
              <button className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:opacity-90 transition-all">
                Acompanhar Pedido
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
