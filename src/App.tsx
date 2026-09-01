import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import ImageTuner from "./components/ImageTuner";

const DojoCaraiva = lazy(() => import("./pages/DojoCaraiva.tsx"));
const DojoBonete = lazy(() => import("./pages/DojoBonete.tsx"));
const CorumbauBjj = lazy(() => import("./pages/CorumbauBjj.tsx"));
const Testes = lazy(() => import("./pages/Testes.tsx"));
const RifaSolidaria = lazy(() => import("./pages/RifaSolidaria.tsx"));
const Sobre = lazy(() => import("./pages/Sobre.tsx"));
const RifaLegal = lazy(() => import("./pages/RifaLegal.tsx"));
const RifaDigital = lazy(() => import("./pages/RifaDigital.tsx"));
const TestesBannerLegalizar = lazy(() => import("./pages/TestesBannerLegalizar.tsx"));
const TestesMosaico = lazy(() => import("./pages/TestesMosaico.tsx"));
const TestesBannerGuia = lazy(() => import("./pages/TestesBannerGuia.tsx"));
const TestesIconeBilhete = lazy(() => import("./pages/TestesIconeBilhete.tsx"));
const TestesHeaderSobre = lazy(() => import("./pages/TestesHeaderSobre.tsx"));
const TestesFonteNome = lazy(() => import("./pages/TestesFonteNome.tsx"));
const TestesCardGuia = lazy(() => import("./pages/TestesCardGuia.tsx"));
const TestesFonteTitulos = lazy(() => import("./pages/TestesFonteTitulos.tsx"));
const TestesHeaderHome = lazy(() => import("./pages/TestesHeaderHome.tsx"));
const TestesVitrine = lazy(() => import("./pages/TestesVitrine.tsx"));
const TestesMetodo = lazy(() => import("./pages/TestesMetodo.tsx"));
const MapeamentoRifa = lazy(() => import("./pages/MapeamentoRifa.tsx"));
const TestesHeader = lazy(() => import("./pages/TestesHeader.tsx"));
const TestesCopy = lazy(() => import("./pages/TestesCopy.tsx"));
const TestesImersivo = lazy(() => import("./pages/TestesImersivo.tsx"));
const TestesFundo = lazy(() => import("./pages/TestesFundo.tsx"));
const TestesBloco = lazy(() => import("./pages/TestesBloco.tsx"));
const TestesHero = lazy(() => import("./pages/TestesHero.tsx"));
const TestesFundoTech = lazy(() => import("./pages/TestesFundoTech.tsx"));
const TestesFundoImpacto = lazy(() => import("./pages/TestesFundoImpacto.tsx"));
const TestesEmoji = lazy(() => import("./pages/TestesEmoji.tsx"));
const TestesDegrade = lazy(() => import("./pages/TestesDegrade.tsx"));
const TestesConfete = lazy(() => import("./pages/TestesConfete.tsx"));
const TestesMapeamento = lazy(() => import("./pages/TestesMapeamento.tsx"));
const TestesProgresso = lazy(() => import("./pages/TestesProgresso.tsx"));
const TestesPilulaEtapa = lazy(() => import("./pages/TestesPilulaEtapa.tsx"));
const TestesDashboardEscalar = lazy(() => import("./pages/TestesDashboardEscalar.tsx"));
const TestesHomeEnxuta = lazy(() => import("./pages/TestesHomeEnxuta.tsx"));
const TestesSobre = lazy(() => import("./pages/TestesSobre.tsx"));
const TestesHomeClean = lazy(() => import("./pages/TestesHomeClean.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ImageTuner />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dojo-caraiva" element={<DojoCaraiva />} />
            <Route path="/dojo-bonete" element={<DojoBonete />} />
            <Route path="/corumbau-bjj" element={<CorumbauBjj />} />
            <Route path="/testes" element={<Testes />} />
            <Route path="/rifa-solidaria" element={<RifaSolidaria />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/como-legalizar-a-rifa" element={<RifaLegal />} />
            <Route path="/como-estruturar-rifa-solidaria-digital" element={<RifaDigital />} />
            <Route path="/testes-banner-legalizar" element={<TestesBannerLegalizar />} />
            <Route path="/testes-mosaico" element={<TestesMosaico />} />
            <Route path="/testes-banner-guia" element={<TestesBannerGuia />} />
            <Route path="/testes-icone-bilhete" element={<TestesIconeBilhete />} />
            <Route path="/testes-header-sobre" element={<TestesHeaderSobre />} />
            <Route path="/testes-fonte-nome" element={<TestesFonteNome />} />
            <Route path="/testes-card-guia" element={<TestesCardGuia />} />
            <Route path="/testes-fonte-titulos" element={<TestesFonteTitulos />} />
            <Route path="/testes-header-home" element={<TestesHeaderHome />} />
            <Route path="/testes-vitrine" element={<TestesVitrine />} />
            <Route path="/mapeamento-rifa-solidaria" element={<MapeamentoRifa />} />
            <Route path="/testes-header" element={<TestesHeader />} />
            <Route path="/testes-copy" element={<TestesCopy />} />
            <Route path="/testes-imersivo" element={<TestesImersivo />} />
            <Route path="/testes-fundo" element={<TestesFundo />} />
            <Route path="/testes-bloco" element={<TestesBloco />} />
            <Route path="/testes-hero" element={<TestesHero />} />
            <Route path="/testes-fundo-tech" element={<TestesFundoTech />} />
            <Route path="/testes-fundo-impacto" element={<TestesFundoImpacto />} />
            <Route path="/testes-emoji" element={<TestesEmoji />} />
            <Route path="/testes-metodo" element={<TestesMetodo />} />
            <Route path="/testes-degrade" element={<TestesDegrade />} />
            <Route path="/testes-confete" element={<TestesConfete />} />
            <Route path="/testes-mapeamento" element={<TestesMapeamento />} />
            <Route path="/testes-progresso" element={<TestesProgresso />} />
            <Route path="/testes-pilula-etapa" element={<TestesPilulaEtapa />} />
            <Route path="/testes-dashboard-escalar" element={<TestesDashboardEscalar />} />
            <Route path="/testes-home-enxuta" element={<TestesHomeEnxuta />} />
            <Route path="/testes-sobre" element={<TestesSobre />} />
            <Route path="/testes-home-clean" element={<TestesHomeClean />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
