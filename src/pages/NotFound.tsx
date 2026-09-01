import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNoIndex } from "@/lib/seo";

const NotFound = () => {
  const location = useLocation();
  useNoIndex("Página não encontrada | Mateus Tafuri");

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 font-display text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Esta página não existe.</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Voltar para a entrada
        </a>
      </div>
    </div>
  );
};

export default NotFound;
