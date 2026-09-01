import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logoTafuri from "@/assets/logo-tafuri.webp";

export type ItemMenu = { label: string; href: string };

/** Menu da home. Cada página pode passar os próprios itens, ou uma lista
    vazia para não mostrar nenhum. */
const PADRAO: ItemMenu[] = [
  { label: "Sobre mim", href: "/sobre" },
  { label: "Rifa Solidária", href: "/rifa-solidaria" },
];

/* `textoEscuro` para páginas de fundo claro: sem imagem atrás, o branco
   com sombra some no fundo. */
const Navbar = ({
  links = PADRAO,
  textoEscuro = false,
}: {
  links?: ItemMenu[];
  textoEscuro?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const simples = links.length === 0;
  const sombra = textoEscuro ? "" : " drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]";

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-transparent">
      <Link to="/" className={`group flex items-center gap-2 text-sm font-semibold${sombra}`}>
        <span
          aria-label="Tafuri"
          className={`w-9 h-9 inline-block transition-all duration-300 group-hover:scale-105 group-hover:brightness-110 ${
            textoEscuro ? "bg-green-dark" : "bg-white"
          }`}
          style={{
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
        <span className={textoEscuro ? "text-green-dark" : "text-white"}>
          Mateus Tafuri
        </span>
      </Link>

      {!simples && (
        <div className={`hidden md:flex items-center gap-6 text-sm${sombra} ${
          textoEscuro ? "text-green-dark/80" : "text-white/90"
        }`}>
          {links.map((l) =>
            l.href.startsWith("/") ? (
              <Link key={l.href} to={l.href} className="hover:text-green-accent transition-colors">
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href} className="hover:text-green-accent transition-colors">
                {l.label}
              </a>
            ),
          )}
        </div>
      )}

      <a
        href="https://wa.me/5567998860067"
        target="_blank"
        rel="noopener noreferrer"
        className={`relative z-0 bg-primary${simples ? "" : " hidden md:inline-block"} text-primary-foreground px-4 py-2 sm:px-5 rounded-full text-sm font-semibold transition-opacity hover:opacity-90`}
      >
        Entrar em contato
      </a>

      {/* o -m-3 devolve o espaço que o p-3 ocupa: alvo de 46px, mesma posição */}
      {!simples && (
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
        className={`-m-3 p-3 md:hidden${textoEscuro ? " text-green-dark" : " text-green-accent drop-shadow"}`}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      )}

      {open && !simples && (
        <div className="absolute top-full left-0 right-0 bg-green-dark/95 backdrop-blur-md flex flex-col p-4 gap-3 md:hidden">
          {links.map((l) =>
            l.href.startsWith("/") ? (
              <Link key={l.href} to={l.href} onClick={() => setOpen(false)} className="py-2 text-sm text-white hover:text-green-accent">
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2 text-sm text-white hover:text-green-accent">
                {l.label}
              </a>
            ),
          )}
          <a
            href="https://wa.me/5567998860067"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-0 bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-semibold text-center transition-opacity hover:opacity-90"
          >
            Entrar em contato
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
