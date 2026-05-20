import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logoTafuri from "@/assets/logo-tafuri.webp";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-transparent">
      <Link to="/" className="group flex items-center gap-2 text-sm font-semibold drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
        <span
          aria-label="Tafuri"
          className="w-9 h-9 inline-block transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
          style={{
            backgroundImage:
              "linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(var(--green-accent)) 60%, hsl(var(--green-accent)) 100%)",
            WebkitMaskImage: `url(${logoTafuri})`,
            maskImage: `url(${logoTafuri})`,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        />
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(var(--green-accent)) 60%, hsl(var(--green-accent)) 100%)",
          }}
        >
          Mateus Tafuri
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-6 text-sm text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
        <a href="#cases" className="hover:text-green-accent transition-colors">Campanhas</a>
        <a href="#trajetoria" className="hover:text-green-accent transition-colors">Trajetória</a>
        <a href="#historia" className="hover:text-green-accent transition-colors">História</a>
        <a href="#feedbacks" className="hover:text-green-accent transition-colors">Depoimentos</a>
      </div>

      <a
        href="https://wa.me/5567998860067"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:inline-block relative z-0 text-white border border-green-accent/40 px-5 py-2 rounded-full text-sm font-medium transition-colors backdrop-blur-sm overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(135deg, hsl(80 15% 25%) 0%, hsl(80 17% 33%) 60%, hsl(82 20% 42%) 100%)",
        }}
      >
        Entrar em contato
      </a>

      <button onClick={() => setOpen(!open)} className="md:hidden text-white drop-shadow">
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-primary/95 backdrop-blur-md flex flex-col p-4 gap-3 md:hidden">
          <a href="#cases" onClick={() => setOpen(false)} className="text-sm text-white hover:text-green-accent">Campanhas</a>
          <a href="#trajetoria" onClick={() => setOpen(false)} className="text-sm text-white hover:text-green-accent">Trajetória</a>
          <a href="#historia" onClick={() => setOpen(false)} className="text-sm text-white hover:text-green-accent">História</a>
          <a href="#feedbacks" onClick={() => setOpen(false)} className="text-sm text-white hover:text-green-accent">Depoimentos</a>
          <a
            href="https://wa.me/5567998860067"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-0 text-white border border-green-accent/40 px-5 py-2 rounded-full text-sm font-medium text-center backdrop-blur-sm overflow-hidden"
            style={{
              backgroundImage:
                "linear-gradient(135deg, hsl(80 15% 25%) 0%, hsl(80 17% 33%) 60%, hsl(82 20% 42%) 100%)",
            }}
          >
            Entrar em contato
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
