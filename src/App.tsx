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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
