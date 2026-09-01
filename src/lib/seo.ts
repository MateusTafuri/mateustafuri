import { useEffect } from "react";

const SITE = "https://mateustafuri.com.br";

/* O site é uma SPA: toda rota nasce com o <head> do index.html, que traz o
   título da home e um canonical fixo apontando para "/". Sem trocar isso na
   troca de rota, o Google lê cada página interna como cópia da entrada e para
   de indexá-las. Este hook reescreve as tags que importam para a busca e para
   o preview em rede social. */

const escrever = (seletor: string, atributo: string, valor: string) => {
  const el = document.head.querySelector(seletor);
  el?.setAttribute(atributo, valor);
};

type Seo = {
  titulo: string;
  descricao: string;
  /* caminho da rota, começando com "/" */
  path: string;
  /* imagem de compartilhamento, quando a página tem uma melhor que a padrão */
  imagem?: string;
};

export const useSeo = ({ titulo, descricao, path, imagem }: Seo) => {
  useEffect(() => {
    const url = `${SITE}${path}`;
    document.title = titulo;
    escrever('meta[name="description"]', "content", descricao);
    escrever('link[rel="canonical"]', "href", url);
    escrever('meta[property="og:title"]', "content", titulo);
    escrever('meta[property="og:description"]', "content", descricao);
    escrever('meta[property="og:url"]', "content", url);
    escrever('meta[name="twitter:title"]', "content", titulo);
    escrever('meta[name="twitter:description"]', "content", descricao);
    if (imagem) {
      escrever('meta[property="og:image"]', "content", `${SITE}${imagem}`);
      escrever('meta[name="twitter:image"]', "content", `${SITE}${imagem}`);
    }
  }, [titulo, descricao, path, imagem]);
};

/* Páginas que não devem entrar no índice (404 e as de teste). O robots.txt já
   barra /testes*, mas a meta protege quem chegar por link direto. */
export const useNoIndex = (titulo: string) => {
  useEffect(() => {
    document.title = titulo;
    /* sem isto a página herda o canonical de quem veio antes e aponta o 404
       para uma página boa qualquer */
    escrever('link[rel="canonical"]', "href", window.location.href);
    let tag = document.head.querySelector('meta[name="robots"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "robots");
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", "noindex, follow");
    return () => tag?.remove();
  }, [titulo]);
};
