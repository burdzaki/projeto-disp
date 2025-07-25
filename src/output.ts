import { getElement } from './utils/dom';

const divResults = getElement<HTMLDivElement>('.result__output__criteria');
const divSlenderness = getElement<HTMLDivElement>('.result__output__slenderness');

export function showSlendernessResult (slenderness : number) : void {
    const slendernessRatio = Number(slenderness.toFixed(2));
    divSlenderness.innerText = ''; //remover no final
    if (isNaN(slendernessRatio) || slendernessRatio === 0) {
        divSlenderness.innerText = '';
    }
    else if (slendernessRatio > 0 && slendernessRatio < 6) {
        divSlenderness.innerText = (`Esbeltez de ${slendernessRatio}: não é necessária a verificação dos efeitos de despredimento de vórtices para a estrutura.`);
    }
    else if (slendernessRatio >= 6) {
        divSlenderness.innerText = (`Esbeltez de ${slendernessRatio}: o critério de dispensa da estrutura deve ser calculado.`);
    }
    else divSlenderness.innerText = '';
}


export function showCalculusResult (resultCriteria : boolean, vCriticalSpeed: number, vStructureSpeed: number) : void {
    divResults.innerText = ''; //remover no final
    const CriticalSpeed = Number(vCriticalSpeed.toFixed(2));
    const StructureSpeed = Number(vStructureSpeed.toFixed(2));
    if (isNaN(CriticalSpeed) || isNaN(StructureSpeed)) {
        divResults.innerText = '';
    }
    else if (resultCriteria === false && CriticalSpeed < StructureSpeed) {
        divResults.innerText = (`A velocidade crítica calculada é de ${CriticalSpeed} m/s, menor que a velocidade atuante na estrutura de ${StructureSpeed} m/s. Os efeitos devem ser verificados.`);
    }
    else if (resultCriteria === false && CriticalSpeed === StructureSpeed) {
        divResults.innerText = (`A velocidade crítica calculada é de ${CriticalSpeed} m/s, igual a velocidade atuante na estrutura de ${StructureSpeed} m/s. Os efeitos devem ser verificados.`);
    }
    else if (resultCriteria === true) {
        divResults.innerText = (`A velocidade crítica é de ${CriticalSpeed} m/s, maior que a velocidade atuante na estrutura de ${StructureSpeed} m/s. Os efeitos não precisam ser verificados.\n\n\n\n\n\n\n\n\n`);
    }
}
