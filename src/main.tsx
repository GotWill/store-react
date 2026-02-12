import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./page/home";
import CheckoutPage from "./page/checkout";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignIn from "./page/sign-in";
import { Toaster } from "sonner";
import SignupPage from "./page/sign-up";
import ProdutosPage from "./page/products";
import ProductDetailPage from "./page/product";
import AddressPage from "./page/address";
import FavoritsPage from "./page/favorits";
import Layout from "./layout/layout";
import SuccessPage from "./page/success";
import { AuthProvider } from "./providers/AuthProvider";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/criar-conta" element={<SignupPage />} />
                <Route path="/produtos" element={<ProdutosPage />} />
                <Route
                  path="/produto/:slug/:id"
                  element={<ProductDetailPage />}
                />
                <Route path="/enderecos" element={<AddressPage />} />
                <Route path="/favoritos" element={<FavoritsPage />} />
                <Route path="/success" element={<SuccessPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
        <Toaster richColors position="top-center" />
    </QueryClientProvider>
  </StrictMode>
);
