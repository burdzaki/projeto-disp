import { getElement } from "./dom";
import { clearHighlight } from "../wizard";

const closeButton = getElement<HTMLButtonElement>('.footer__terms--close');
const hideTerms = getElement<HTMLElement>('#footer-terms');

export function showLicense(): void {
    const licenseText = `
    <h4>Licença MIT</h4>

    <br><p>Copyright (c) 2025 Alana Burdzaki</p>

    <br><p>Por meio deste, é concedida permissão, gratuita, a qualquer pessoa que obtenha uma cópia
    deste software e dos arquivos de documentação associados (o "Software"), para lidar
    com o Software sem restrições, incluindo, sem limitação, os direitos
    de usar, copiar, modificar, mesclar, publicar, distribuir, sublicenciar e/ou vender
    cópias do Software, e permitir que as pessoas a quem o Software for fornecido
    o façam, sujeitas às seguintes condições:</p>

    <br><p>O aviso de copyright acima e este aviso de permissão deverão ser incluídos em todas
    as cópias ou partes substanciais do Software.</p>

    <br><p>O SOFTWARE É FORNECIDO "NO ESTADO EM QUE SE ENCONTRA", SEM GARANTIA DE QUALQUER TIPO,
    EXPRESSA OU IMPLÍCITA, INCLUINDO, MAS NÃO SE LIMITANDO ÀS GARANTIAS DE COMERCIALIZAÇÃO,
    ADEQUAÇÃO A UMA FINALIDADE ESPECÍFICA E NÃO INFRAÇÃO. EM NENHUMA HIPÓTESE OS AUTORES
    OU DETENTORES DOS DIREITOS AUTORAIS SERÃO RESPONSÁVEIS POR QUALQUER RECLAMAÇÃO, DANO
    OU OUTRA RESPONSABILIDADE, SEJA EM UMA AÇÃO DE CONTRATO, DELITO OU DE OUTRA FORMA,
    DECORRENTE DE, FORA DE OU EM CONEXÃO COM O SOFTWARE OU O USO OU OUTRAS NEGOCIAÇÕES
    NO SOFTWARE.</p>
    
    <br><p>Tradução não oficial da Licença MIT, apresentada para fins informativos.</p>

    <br><hr><hr>

    <br><h4>MIT License (official version)</h4>

    <br><p>Copyright (c) 2025 Alana Burdzaki</p>

    <br><p>Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:</p>

    <br><p>The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.</p>

    <br><p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.</p>
    `;

    const licenseTextContainer = getElement<HTMLElement>('#footer__terms__text');
    if (licenseTextContainer) {
        licenseTextContainer.innerHTML = licenseText;
    }

    getElement<HTMLElement>('.footer__terms__container')
        hideTerms?.classList.remove("footer__terms--hidden");

    closeButton.addEventListener('click', () => {
        hideTerms?.classList.add("footer__terms--hidden");
        // ALTERADO: REMOVIDO MODAL-OPEN
        document.body.classList.remove('modal-open');
        clearHighlight();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') hideTerms?.classList.add("footer__terms--hidden");
    });
}
