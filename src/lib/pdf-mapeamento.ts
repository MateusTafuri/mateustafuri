import { ETAPAS } from "@/data/rifaSolidaria";
import { chaveDe, type Mapeamento } from "@/hooks/use-mapeamento";
import logoTafuri from "@/assets/logo-tafuri.webp";

/* Gera a folha do Mapeamento em PDF: A4 deitada, cinco etapas em colunas e
   três blocos em cada uma. O jsPDF entra por import dinâmico, então só é
   baixado por quem clica no botão. */

const COR: [number, number, number][] = [
  [22, 48, 46], // Sonhar
  [228, 99, 60], // Ofertar
  [179, 30, 90], // Contar
  [29, 127, 184], // Escalar
  [30, 158, 86], // Retribuir
];

const PRETO: [number, number, number] = [26, 26, 26];
const CINZA: [number, number, number] = [110, 110, 110];

/* medidas da página, em mm */
const M = 10; // margem
const LARGURA = 297;
const COL_GAP = 3;
const COL = (LARGURA - 2 * M - 4 * COL_GAP) / 5;
const FAIXA_Y = 24;
const FAIXA_H = 13;
const LINHA_Y = 41;
const LINHA_H = 50;
const LINHA_GAP = 3;

const x = (col: number) => M + col * (COL + COL_GAP);

/** O logo é webp, que o jsPDF não lê: converte para PNG no canvas antes. */
const logoPng = async () => {
  const img = new Image();
  img.src = logoTafuri;
  await img.decode();
  const canvas = document.createElement("canvas");
  // 96px dá de sobra para 9mm impressos e segura o PDF em poucos KB
  canvas.width = 96;
  canvas.height = 96;
  canvas.getContext("2d")?.drawImage(img, 0, 0, 96, 96);
  return canvas.toDataURL("image/png");
};

export const baixarPdf = async (m: Mapeamento) => {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

  /* ── cabeçalho ── */
  try {
    doc.addImage(await logoPng(), "PNG", M, 9, 9, 9);
  } catch {
    // sem o pássaro a folha continua de pé
  }
  doc.setTextColor(...COR[0]);
  doc.setFont("helvetica", "bold").setFontSize(16);
  doc.text("Mapeamento Rifa Solidária", M + 12, 16);

  doc.setFontSize(7).text("MATEUS TAFURI", LARGURA - M, 13, { align: "right" });
  doc.setFont("helvetica", "italic").setFontSize(6).setTextColor(...CINZA);
  doc.text("ESTRATEGISTA DIGITAL", LARGURA - M, 16.5, { align: "right" });

  doc.setDrawColor(...COR[0]).setLineWidth(0.6);
  doc.line(M, 19.5, LARGURA - M, 19.5);

  /* ── faixa de cada etapa ── */
  ETAPAS.forEach((e, idx) => {
    doc.setFillColor(...COR[idx]);
    doc.roundedRect(x(idx), FAIXA_Y, COL, FAIXA_H, 1, 1, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold").setFontSize(10);
    doc.text(e.title, x(idx) + 3, FAIXA_Y + 5);

    doc.setFont("helvetica", "normal").setFontSize(5.5);
    doc.text(`0${e.n}/0${ETAPAS.length}`, x(idx) + COL - 3, FAIXA_Y + 4.5, {
      align: "right",
    });

    doc.setFont("helvetica", "italic").setFontSize(6);
    doc
      .splitTextToSize(e.pergunta, COL - 6)
      .slice(0, 2)
      .forEach((l: string, k: number) =>
        doc.text(l, x(idx) + 3, FAIXA_Y + 8.5 + k * 2.6),
      );
  });

  /* ── os quinze blocos ── */
  const truncadas: string[] = [];

  [0, 1, 2].forEach((linha) => {
    const y = LINHA_Y + linha * (LINHA_H + LINHA_GAP);

    ETAPAS.forEach((e, idx) => {
      const bloco = e.canvas[linha];
      const resposta = (m.respostas[chaveDe(e.n, bloco.title)] || "").trim();
      const px = x(idx) + 3;

      doc.setDrawColor(...COR[idx]).setLineWidth(0.4);
      doc.roundedRect(x(idx), y, COL, LINHA_H, 1, 1, "S");

      doc.setTextColor(...COR[idx]);
      doc.setFont("helvetica", "bold").setFontSize(8);
      doc.text(bloco.title, px, y + 5);

      doc.setTextColor(...CINZA);
      doc.setFont("helvetica", "italic").setFontSize(6);
      const pergunta = doc.splitTextToSize(bloco.pergunta, COL - 6);
      pergunta.forEach((l: string, k: number) =>
        doc.text(l, px, y + 9 + k * 2.6),
      );

      /* a área livre começa embaixo da pergunta e termina antes da dica */
      const topo = y + 10.5 + pergunta.length * 2.6;
      const base = y + LINHA_H - 9;

      if (resposta) {
        doc.setTextColor(...PRETO);
        doc.setFont("helvetica", "normal").setFontSize(7);
        const linhas = doc.splitTextToSize(resposta, COL - 6);
        const cabem = Math.floor((base - topo) / 3);
        linhas.slice(0, cabem).forEach((l: string, k: number) => {
          const ultima = k === cabem - 1 && linhas.length > cabem;
          doc.text(ultima ? `${l}…` : l, px, topo + 3 + k * 3);
        });
        // resposta longa não é cortada fora: vai inteira na página seguinte
        if (linhas.length > cabem) truncadas.push(bloco.title);
      } else {
        doc.setDrawColor(190, 190, 190).setLineWidth(0.15);
        for (let k = 0; topo + 4 + k * 5 < base; k++) {
          doc.line(px, topo + 4 + k * 5, x(idx) + COL - 3, topo + 4 + k * 5);
        }
      }

      doc.setDrawColor(210, 210, 210).setLineWidth(0.15);
      doc.line(px, base + 1.5, x(idx) + COL - 3, base + 1.5);

      doc.setTextColor(...COR[idx]);
      doc.setFont("helvetica", "italic").setFontSize(5.5);
      doc
        .splitTextToSize(bloco.dica, COL - 6)
        .slice(0, 2)
        .forEach((l: string, k: number) =>
          doc.text(l, px, base + 4.5 + k * 2.3),
        );
    });
  });

  /* ── rodapé ── */
  doc.setTextColor(...CINZA);
  doc.setFont("helvetica", "italic").setFontSize(6);
  doc.text("Quando uma causa tem propósito, ela merece voz.", M, 203);
  doc.text(
    `${m.totalPreenchidas} de 15 respondidas · mateustafuri.com.br`,
    LARGURA - M,
    203,
    { align: "right" },
  );

  /* ── página 2: só quando alguma resposta não coube na folha ── */
  if (truncadas.length) {
    doc.addPage();
    doc.setTextColor(...COR[0]);
    doc.setFont("helvetica", "bold").setFontSize(13);
    doc.text("Respostas completas", M, 18);

    let y = 28;
    ETAPAS.forEach((e, idx) =>
      e.canvas.forEach((bloco) => {
        const resposta = (m.respostas[chaveDe(e.n, bloco.title)] || "").trim();
        if (!resposta) return;

        const linhas = doc.splitTextToSize(resposta, LARGURA - 2 * M);
        if (y + 8 + linhas.length * 4 > 195) {
          doc.addPage();
          y = 20;
        }

        doc.setTextColor(...COR[idx]);
        doc.setFont("helvetica", "bold").setFontSize(9);
        doc.text(`${e.title} · ${bloco.title}`, M, y);

        doc.setTextColor(...PRETO);
        doc.setFont("helvetica", "normal").setFontSize(9);
        linhas.forEach((l: string, k: number) => doc.text(l, M, y + 5 + k * 4));
        y += 9 + linhas.length * 4;
      }),
    );
  }

  doc.save("mapeamento-rifa-solidaria.pdf");
};
