import { getElement } from "./utils/dom";

const divResults = getElement<HTMLDivElement>('.output__result');
const divSlenderness = getElement<HTMLDivElement>('.output__slenderness');

export function showCalculusResult (resultNumber : number) : void {
    divResults.innerText = ''; //remover no final
    if (isNaN(resultNumber) || resultNumber === 0) {
        divResults.innerText = '';
    }
    else divResults.innerText = (`O resultado do cálculo é: ${resultNumber}`);
}

export function showSlendernessResult (slendernessRatio : number) : void {
    divSlenderness.innerText = ''; //remover no final
    if (isNaN(slendernessRatio) || slendernessRatio === 0) {
        divSlenderness.innerText = '';
    }
    else divSlenderness.innerText = (`A esbeltez é de: ${slendernessRatio}`);
}
