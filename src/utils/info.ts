import { getElement } from "./dom";
import { clearHighlight } from "../wizard";

const closeButton = getElement<HTMLButtonElement>('.about__modal--close');
const hideInfo = getElement<HTMLElement>('#about__modal');

export function showInfo(): void {
    const infoText = `
    <br><p>O Verificador DISP é uma ferramenta desenvolvida para calcular a aplicabilidade do critério de dispensa de verificação dos efeitos devido ao desprendimento de vórtices em estruturas, conforme estabelece a norma NBR 6123:2023 – Forças Devidas ao Vento em Edificações.</p>

    <br><p>O sistema calcula a velocidade crítica do vento da estrutura (Vcr) e compara com a velocidade básica do vento atuando na estrutura (Vest), considerando os parâmetros geométricos e regionais inseridos. Caso o critério da norma seja atendido, a verificação completa da ação dinâmica por desprendimento de vórtices pode ser dispensada.</p>

    <br><p>Os dados listados de velocidade básica do vento fornecidos são baseados na tabela de isopletas da empresa Elgin.</p>

    <br><p>Este projeto é open source e foi desenvolvido como parte do Trabalho de Conclusão do Curso (TCC) do MBA em Engenharia de Software da USP/Esalq, licenciado sob a Licença MIT e disponível publicamente no GitHub.</p>

    <br><hr>

    <br><p>Referências principais</p>

    <br><p>NBR 6123 (2023) – Forças Devidas ao Vento em Edificações. Associação Brasileira de Normas Técnicas (ABNT).</p>

    <br><p>Elgin (2022). <a href="https://content.elgin.com.br/assets/arquivos/lista_de_isopletas_por_regi%C3%A3o_elgin.pdf" target="_blank" rel="noopener noreferrer">Lista de Isopletas por Região.</a></p>
    `;

    const infoTextContainer = getElement<HTMLElement>('#about__modal__text');
    if (infoTextContainer) {
        infoTextContainer.innerHTML = infoText;
    }

    getElement<HTMLElement>('.about__modal__container')
        hideInfo?.classList.remove("about__modal--hidden");


    closeButton.addEventListener('click', () => {
        hideInfo?.classList.add("about__modal--hidden");
        // ALTERADO: REMOVIDO MODAL-OPEN
        document.body.classList.remove('modal-open');
        clearHighlight();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') hideInfo?.classList.add("about__modal--hidden");
    });
    
}
