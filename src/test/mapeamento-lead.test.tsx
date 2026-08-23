import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MapeamentoRifa from "@/pages/MapeamentoRifa";
import { salvarLead } from "@/lib/leads";

/* o PDF de verdade puxa o jsPDF e desenha no canvas: aqui só interessa
   saber se ele foi chamado, e em que momento */
const baixarPdf = vi.hoisted(() => vi.fn());
vi.mock("@/lib/pdf-mapeamento", () => ({ baixarPdf }));

const abrirPagina = () =>
  render(
    <MemoryRouter>
      <MapeamentoRifa />
    </MemoryRouter>,
  );

const clicarBaixar = () =>
  fireEvent.click(screen.getByRole("button", { name: /baixar em pdf/i }));

describe("portão do PDF no Mapeamento", () => {
  beforeEach(() => {
    localStorage.clear();
    baixarPdf.mockClear();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
  });
  afterEach(() => vi.unstubAllGlobals());

  it("pede o contato antes do PDF na primeira vez", () => {
    abrirPagina();
    clicarBaixar();

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(baixarPdf).not.toHaveBeenCalled();
  });

  it("gera o PDF depois que o contato é enviado", async () => {
    abrirPagina();
    clicarBaixar();

    fireEvent.change(screen.getByLabelText(/seu nome/i), {
      target: { value: "Maria Silva" },
    });
    fireEvent.change(screen.getByLabelText(/celular/i), {
      target: { value: "67998860067" },
    });
    fireEvent.change(screen.getByLabelText(/e-mail/i), {
      target: { value: "maria@email.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /baixar o meu pdf/i }));

    await waitFor(() => expect(baixarPdf).toHaveBeenCalledTimes(1));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("não pede o contato de novo em quem já preencheu", () => {
    salvarLead({ nome: "Maria", celular: "(67) 99886-0067", email: "maria@email.com" });
    abrirPagina();
    clicarBaixar();

    expect(screen.queryByRole("dialog")).toBeNull();
    expect(baixarPdf).toHaveBeenCalledTimes(1);
  });
});
