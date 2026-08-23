import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ModalLead from "@/components/ModalLead";
import { leadSalvo } from "@/lib/leads";

/* fireEvent basta aqui: são inputs controlados simples, sem máscara de
   teclado nem foco disputado. */
const digitar = (rotulo: RegExp, valor: string) =>
  fireEvent.change(screen.getByLabelText(rotulo), { target: { value: valor } });

const preencherTudo = () => {
  digitar(/seu nome/i, "Maria Silva");
  digitar(/celular/i, "67998860067");
  digitar(/e-mail/i, "maria@email.com");
};

describe("ModalLead", () => {
  let fetchFalso: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    localStorage.clear();
    fetchFalso = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchFalso);
  });
  afterEach(() => vi.unstubAllGlobals());

  it("não aparece enquanto estiver fechado", () => {
    render(<ModalLead aberto={false} aoFechar={() => {}} aoConcluir={() => {}} />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("segura o PDF e mostra os três erros quando o formulário está vazio", async () => {
    const concluir = vi.fn();
    render(<ModalLead aberto aoFechar={() => {}} aoConcluir={concluir} />);

    fireEvent.click(screen.getByRole("button", { name: /baixar o meu pdf/i }));

    expect(await screen.findAllByRole("alert")).toHaveLength(3);
    expect(concluir).not.toHaveBeenCalled();
    expect(fetchFalso).not.toHaveBeenCalled();
  });

  it("recusa e-mail inválido mesmo com nome e celular certos", async () => {
    const concluir = vi.fn();
    render(<ModalLead aberto aoFechar={() => {}} aoConcluir={concluir} />);

    digitar(/seu nome/i, "Maria Silva");
    digitar(/celular/i, "67998860067");
    digitar(/e-mail/i, "maria.email.com");
    fireEvent.click(screen.getByRole("button", { name: /baixar o meu pdf/i }));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(concluir).not.toHaveBeenCalled();
  });

  it("mascara o celular enquanto digita", () => {
    render(<ModalLead aberto aoFechar={() => {}} aoConcluir={() => {}} />);
    digitar(/celular/i, "67998860067");
    expect(screen.getByLabelText(/celular/i)).toHaveValue("(67) 99886-0067");
  });

  it("envia, guarda no navegador e libera o PDF", async () => {
    const concluir = vi.fn();
    render(
      <ModalLead
        aberto
        aoFechar={() => {}}
        aoConcluir={concluir}
        extras={{ origem: "Mapeamento", progresso: "9 de 15" }}
      />,
    );

    preencherTudo();
    fireEvent.click(screen.getByRole("button", { name: /baixar o meu pdf/i }));

    await waitFor(() => expect(concluir).toHaveBeenCalledTimes(1));

    const [url, opcoes] = fetchFalso.mock.calls[0];
    expect(url).toBe("/api/lead");
    const p = JSON.parse(opcoes.body as string);
    expect(p.nome).toBe("Maria Silva");
    expect(p.celular).toBe("(67) 99886-0067");
    expect(p.email).toBe("maria@email.com");
    expect(p.origem).toBe("Mapeamento");
    expect(p.progresso).toBe("9 de 15");

    expect(leadSalvo()?.nome).toBe("Maria Silva");
  });

  it("libera o PDF mesmo se o envio falhar: a pessoa cumpriu a parte dela", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    const concluir = vi.fn();
    render(<ModalLead aberto aoFechar={() => {}} aoConcluir={concluir} />);

    preencherTudo();
    fireEvent.click(screen.getByRole("button", { name: /baixar o meu pdf/i }));

    await waitFor(() => expect(concluir).toHaveBeenCalledTimes(1));
    expect(leadSalvo()?.email).toBe("maria@email.com");
  });

  it("fecha no X e no Esc", () => {
    const fechar = vi.fn();
    render(<ModalLead aberto aoFechar={fechar} aoConcluir={() => {}} />);

    fireEvent.click(screen.getByRole("button", { name: /fechar/i }));
    fireEvent.keyDown(document, { key: "Escape" });
    expect(fechar).toHaveBeenCalledTimes(2);
  });
});
