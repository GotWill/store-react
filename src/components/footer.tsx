import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/70" />
                <svg
                  className="w-6 h-6 text-primary-foreground relative z-10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold text-foreground tracking-tight">Luxe</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground -mt-1">Store</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Design sofisticado para ambientes únicos. Cada peça conta uma história de elegância e qualidade.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 bg-secondary hover:bg-primary hover:text-primary-foreground rounded-lg flex items-center justify-center text-muted-foreground transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-secondary hover:bg-primary hover:text-primary-foreground rounded-lg flex items-center justify-center text-muted-foreground transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-secondary hover:bg-primary hover:text-primary-foreground rounded-lg flex items-center justify-center text-muted-foreground transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-secondary hover:bg-primary hover:text-primary-foreground rounded-lg flex items-center justify-center text-muted-foreground transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Úteis */}
          <div>
            <h4 className="font-semibold text-foreground mb-5">Navegação</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/produtos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Produtos
                </Link>
              </li>
              <li>
                <Link to="/pedidos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Meus Pedidos
                </Link>
              </li>
              <li>
                <Link to="/favoritos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Favoritos
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Carrinho
                </Link>
              </li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h4 className="font-semibold text-foreground mb-5">Suporte</h4>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Política de Troca
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Rastrear Pedido
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold text-foreground mb-5">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary mt-0.5" />
                <span className="text-sm text-muted-foreground">contato@luxestore.com.br</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary mt-0.5" />
                <span className="text-sm text-muted-foreground">(11) 99999-9999</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  Av. Paulista, 1000
                  <br />
                  São Paulo - SP
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
