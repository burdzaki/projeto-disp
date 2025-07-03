import { getElement } from "./utils/dom";

const divResults = getElement<HTMLDivElement>('.output__result');
const divSlenderness = getElement<HTMLDivElement>('.output__slenderness');

export function showSlendernessResult (slendernessRatio : number) : void {
    divSlenderness.innerText = ''; //remover no final
    if (isNaN(slendernessRatio) || slendernessRatio === 0) {
        divSlenderness.innerText = '';
    }
    else if (slendernessRatio > 0 && slendernessRatio < 6) {
        divSlenderness.innerText = (`Esbeltez de ${slendernessRatio}: os efeitos de desprendimento de vórtices não necessitam ser investigados.`);
    }
    else if (slendernessRatio >= 6) {
        divSlenderness.innerText = (`Esbeltez de ${slendernessRatio}: os efeitos de desprendimento de vórtices devem ser investigados`);
    }
    else divSlenderness.innerText = '';
}


export function showCalculusResult (resultNumber : number) : void {
    divResults.innerText = ''; //remover no final
    if (isNaN(resultNumber) || resultNumber === 0) {
        divResults.innerText = '';
    }
    else divResults.innerText = (`O resultado do cálculo é: ${resultNumber}`);
}
