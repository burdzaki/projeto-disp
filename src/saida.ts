import { getElement } from "./utils/dom";

const divResultados = getElement<HTMLDivElement>('.entrada__resultados--calculo');
const divEsbeltez = getElement<HTMLDivElement>('.entrada__resultados--esbeltez');

export function resultadoCalculo (numeroCalculado : number) : void {
    divResultados.innerText = ''; //remover no final
    if (isNaN(numeroCalculado) || numeroCalculado === 0) {
        divResultados.innerText = '';
    }
    else divResultados.innerText = (`O resultado do cálculo é: ${numeroCalculado}`);
}

export function resultadoEstelbez (esbeltezCalculada : number) : void {
    divEsbeltez.innerText = ''; //remover no final
    if (isNaN(esbeltezCalculada) || esbeltezCalculada === 0) {
        divEsbeltez.innerText = '';
    }
    else divEsbeltez.innerText = (`A esbeltez é de: ${esbeltezCalculada}`);
}
