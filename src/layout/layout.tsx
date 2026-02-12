import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
