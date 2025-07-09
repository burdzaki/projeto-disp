import { getElement } from "./utils/dom";

const divResults = getElement<HTMLDivElement>('.output__result');
const divSlenderness = getElement<HTMLDivElement>('.output__slenderness');

export function showSlendernessResult (slenderness : number) : void {
    const slendernessRatio = Number(slenderness.toFixed(2));
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


export function showCalculusResult (resultCriteria : boolean, vCriticalSpeed: number, vStructureSpeed: number) : void {
    divResults.innerText = ''; //remover no final
    const CriticalSpeed = Number(vCriticalSpeed.toFixed(2));
    const StructureSpeed = Number(vStructureSpeed.toFixed(2));
    if (resultCriteria === false) {
        divResults.innerText = (`A velocidade crítica é de ${CriticalSpeed} m/s, menor que a velocidade atuante na estrutura ${StructureSpeed} m/s. Os efeitos não precisam ser verificados.`);
    }
    else if (resultCriteria === true) {
        divResults.innerText = (`A velocidade crítica é de ${CriticalSpeed} m/s, menor que a velocidade atuante na estrutura ${StructureSpeed} m/s. Os efeitos devem ser verificados.`);
    }
}
