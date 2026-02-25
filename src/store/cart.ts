import type { Product } from "@/types/products";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  product: Product;
  quantity: number;
};

interface CartState {
  cart: CartItem[];
  addItem: (product: CartItem) => void;
  updateQuantity: (product: Product, quantity: number) => void;
  deleteItem: (id: number) => void;
  clearCart: () => void;
  _updateTotals: (newCart: CartItem[]) => void;
  subtotal: number;
  shipping: number;
  total: number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      subtotal: 0,
      shipping: 0,
      total: 0,
      _updateTotals: (newCart: CartItem[]) => {
        const sub = newCart.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0
        );
        const ship = sub > 500 || newCart.length === 0 ? 0 : 29.9;
        set({
          cart: newCart,
          subtotal: sub,
          shipping: ship,
          total: sub + ship,
        });
      },
      addItem: ({ product, quantity }) => {
        const { cart } = get();
        const existingProduct = cart.find(
          (item) => item.product.id === product.id
        );

        let newCart;
        if (existingProduct) {
          newCart = cart.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          newCart = [...cart, { product, quantity }];
        }

        toast.success("Produto adicionado à sacola");
        get()._updateTotals(newCart);
      },
      updateQuantity: (product: Product, quantity: number) => {
        const newCart = get().cart.map((item) =>
          item.product.id === product.id ? { ...item, quantity } : item
        );
        get()._updateTotals(newCart);
      },
      deleteItem: (id: number) => {
        const newCart = get().cart.filter(({ product }) => product.id !== id);
        get()._updateTotals(newCart);
      },
      clearCart: () => {
        set({ cart: [] });
      },
    }),
    {
      name: "store",
      partialize: (state) => ({
        cart: state.cart,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state._updateTotals(state.cart);
        }
      },
    }
  )
);
