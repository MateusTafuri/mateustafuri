import { Instagram, Linkedin, MessageCircle } from "lucide-react";
import logoTafuri from "@/assets/logo-tafuri.webp";

const CtaSection = () => {
  return (
    <section className="bg-secondary py-8 px-6 text-center" id="contato">
      <div className="max-w-lg mx-auto">
        <img
          src={logoTafuri}
          alt="Mateus Tafuri"
          className="w-20 h-20 mx-auto mb-1 [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(58%)_saturate(1654%)_hue-rotate(78deg)_brightness(96%)_contrast(95%)]"
        />
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Vamos juntos</p>
        <h2 className="text-3xl font-bold text-green-dark mb-3">Pronto para gerar impacto?</h2>
        <p className="text-secondary-foreground/80 mb-8 text-sm leading-relaxed">
          Entre em contato e vamos construir a estratégia certa para a sua causa.
        </p>
        <a
          href="https://wa.me/5567998860067"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary text-primary-foreground px-7 py-3.5 rounded-full text-base font-semibold hover:opacity-90 transition-opacity"
        >
          Falar com Mateus no WhatsApp
        </a>

        <div className="mt-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <a
              href="https://www.instagram.com/mateustafuri/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Mateus Tafuri"
              className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://wa.me/5567998860067"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp de Mateus Tafuri"
              className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <MessageCircle size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/mateus-tafuri/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de Mateus Tafuri"
              className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <Linkedin size={20} />
            </a>
          </div>
          <p className="text-sm text-secondary-foreground/80">Me siga nas redes sociais</p>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
