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
            <Route path="/testes-metodo" element={<TestesMetodo />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
