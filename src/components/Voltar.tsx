import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* O react-router numera as entradas do histórico em window.history.state.idx.
   idx 0 quer dizer que esta é a primeira página da visita (link do Google, do
   WhatsApp, aba nova): aí um navigate(-1) jogaria a pessoa para fora do site.
   Só nesse caso o botão usa o destino fixo. */
export const temHistoricoInterno = () =>
  ((window.history.state as { idx?: number } | null)?.idx ?? 0) > 0;

/* volta para a página anterior de dentro do site; `fallback` é para quem caiu
   aqui direto, sem página anterior */
export const useVoltar = (fallback: string) => {
  const navigate = useNavigate();
  return () => (temHistoricoInterno() ? navigate(-1) : navigate(fallback));
};

export const Voltar = ({
  fallback,
  className = "",
  rotulo = "Voltar",
}: {
  fallback: string;
  className?: string;
  rotulo?: string;
}) => (
  /* py-3 -my-3: alvo de 44px sem mudar o lugar onde a seta aparece */
  <button type="button" onClick={useVoltar(fallback)} className={`py-3 -my-3 ${className}`}>
    <ArrowLeft size={16} /> {rotulo}
  </button>
);
