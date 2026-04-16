import { useState } from "react";
import { Menu, X } from "lucide-react";
import logoTafuri from "@/assets/logo-tafuri.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-border bg-background/95 backdrop-blur-md">
      <a href="#" className="flex items-center gap-2 text-sm font-semibold text-primary">
        <img src={logoTafuri} alt="Tafuri" className="w-6 h-6" />
        Mateus Tafuri
      </a>

      <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
        <a href="#cases" className="hover:text-primary transition-colors">Resultados</a>
        <a href="#servicos" className="hover:text-primary transition-colors">Trajetória</a>
        <a href="#historia" className="hover:text-primary transition-colors">História</a>
      </div>

      <a
        href="https://wa.me/5567998860067"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:inline-block bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
      >
        Entrar em contato
      </a>

      <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-border flex flex-col p-4 gap-3 md:hidden">
          <a href="#cases" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-primary">Resultados</a>
          <a href="#servicos" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-primary">Trajetória</a>
          <a href="#historia" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-primary">História</a>
          <a
            href="https://wa.me/5567998860067"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-medium text-center"
          >
            Entrar em contato
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
