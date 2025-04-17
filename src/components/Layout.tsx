import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout() {
  return (
    <div
      className="min-h-screen bg-no-repeat bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/neon.png')" }}
    >
      <Header />
      <main className="pt-24 px-4 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
