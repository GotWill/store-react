import {
  ShoppingBag,
  User,
  Menu,
  X,
  Heart,
  LogOutIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { Link } from "react-router-dom";
import { useCart } from "@/store/cart";
import { useAuth } from "@/store/user";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isAutenticated, user, logout, isLoading } = useAuth((state) => state);


  const cart = useCart((state) => state.cart);

  async function handleLogout() {
    await signOut(auth);
    logout();
  }

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 from-primary to-primary/70" />
              <svg
                className="w-5 h-5 text-primary-foreground relative z-10"
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
              <span className="text-lg font-semibold text-foreground tracking-tight leading-none">
                Luxe
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                Store
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Início
            </Link>
            <Link
              to="/produtos"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Produtos
            </Link>
            {isLoading ? (
              <div className="w-24 h-4 bg-muted animate-pulse rounded" />
            ) : (
              !isAutenticated && (
                <>
                  <Link
                    to="/criar-conta"
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    Criar conta
                  </Link>
                  <Link
                    to="/login"
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    Entrar
                  </Link>
                </>
              )
            )}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/favoritos">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-muted-foreground hover:text-primary"
              >
                <Heart className="w-5 h-5" />
              </Button>
            </Link>
            {isLoading ? (
              <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild data-testid="dropdown">
                  {isAutenticated ? (
                    <Avatar>
                      <AvatarImage src={user?.imageUrl} />
                      <AvatarFallback>
                        {user?.name?.split("")[0].toUpperCase()}
                        {user?.lastName?.split("")[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative text-muted-foreground hover:text-primary"
                    >
                      <User />
                    </Button>
                  )}
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/enderecos" data-testid="address">Endereços</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/favoritos">Favoritos</Link>
                  </DropdownMenuItem>
                  {isAutenticated && (
                    <DropdownMenuItem>
                      <button
                        className="flex items-center gap-2 w-full"
                        onClick={handleLogout}
                      >
                        <LogOutIcon /> Sair
                      </button>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <Link to="/checkout" data-testid="checkout">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-muted-foreground hover:text-primary"
              >
                <ShoppingBag className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <Link
                to="/"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Início
              </Link>
              <Link
                to="/produtos"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Produtos
              </Link>
              <Link
                to="/enderecos"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Endereços
              </Link>
              <Link
                to="/favoritos"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Favoritos
              </Link>
              <Link
                to="/checkout"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Carrinho
              </Link>
              <Link
                to="/login"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Entrar
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
