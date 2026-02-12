import type { User, UserAuth } from "@/types/users";
import { create } from "zustand";

interface State {
  userAuth: UserAuth | null;
  user: User | null;
  isAutenticated: boolean;
  isLoading: boolean;
  setUser: (user: User) => void;
  setIsloading: (value: boolean) => void;
  setUserAuth: (user: UserAuth) => void;
  logout: () => void;
}

export const useAuth = create<State>((set) => ({
  userAuth: null,
  user: null,
  isLoading: true,
  isAutenticated: false,
  logout: () =>
    set(() => ({ user: null, userAuth: null, isAutenticated: false })),
  setIsloading: (value: boolean) => set({ isLoading: value }),
  setUserAuth: (user) =>
    set({ userAuth: user, isAutenticated: true, isLoading: false }),
  setUser: (user) => set({ user: user }),
}));
