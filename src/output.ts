import { getElement } from './utils/dom';
import { formatNumber } from './utils/format';
import { addChartPoint, addVcrLines } from './utils/graphicControl';
import { marked } from 'marked';

import resultStructureSpeedBaseMd from "./assets/result-structure-speed.md?raw";
import resultStInputMd from "./assets/result-st-input.md?raw";
import resultStStandardMd from "./assets/result-st-standard.md?raw";

const divResults = getElement<HTMLDivElement>('.result-output__criteria');
const divSlenderness = getElement<HTMLDivElement>('.result-output__slenderness');
const printButton = getElement<HTMLButtonElement>('.result-output--print');

let resultAlreadyShown = false;

export function showSlendernessResult (slenderness : number) : void {
    const slendernessRatio = Number(slenderness.toFixed(2));
    divSlenderness.innerHTML = ''; //remover no final
    if (isNaN(slendernessRatio) || slendernessRatio === 0) {
        divSlenderness.innerHTML = '';
    }
    else if (slendernessRatio > 0 && slendernessRatio < 6) {
        divSlenderness.innerHTML = (`<p>A esbeltez calculada possui valor ${formatNumber(slenderness, 2)}: de acordo com o Item 10.2 da NBR 6123:2023, a estrutura está dispensada da verificação dos efeitos de despredimento de vórtices.</p>`);
    }
    else if (slendernessRatio >= 6) {
        divSlenderness.innerHTML = (`<p>A esbeltez calculada possui valor ${formatNumber(slenderness, 2)}: e acordo com o Item 10.2 da NBR 6123:2023, o critério de dispensa da estrutura deve ser calculado.</p>`);
    }
    else divSlenderness.innerHTML = '';
}

export async function showCalculusResult (structureHeight: number, dimensionD0: number, slenderness: number, structureCategory: string, elevationZ: number, speedV0: number, topographicFactorS1: number, meteorologicalParameterBm: number, exponentP: number, roughnessFactorS2: number, statisticalFactorS3: number, structureFrequencyFn: number, vStructureSpeed: number, vCriticalSpeed: number, transversalDimensionL: number, strouhalNumberSt: number, resultCriteria: boolean, widthA: number, lenghtB: number, windMode: boolean): Promise<void> {
    
    divResults.innerHTML = '';

    const resultStructureSpeedBase = await marked.parse(
        outputVariables(resultStructureSpeedBaseMd, {
            
            structureHeight: formatNumber(structureHeight, 2),
            dimensionD0: formatNumber(dimensionD0, 2),
            slenderness: formatNumber(slenderness, 2),
            structureCategory,
            elevationZ: formatNumber(elevationZ, 2),
            speedV0: formatNumber(speedV0, 2),
            topographicFactorS1: formatNumber(topographicFactorS1, 2),
            roughnessFactorS2: formatNumber(roughnessFactorS2, 2),
            meteorologicalParameterBm: formatNumber(meteorologicalParameterBm),
            exponentP: formatNumber(exponentP),
            statisticalFactorS3: formatNumber(statisticalFactorS3),
            vStructureSpeed: formatNumber(vStructureSpeed, 2)
        })
    )

    const windString: string = `       
        <br><p>&emsp;Obs.: Valor de velocidade básica de vento (V0) adotada a partir das lista de isopletas fornecida pela Elgin.</p>
    `;

    let resultCriteriaTextVerification : string = '';
    let resultCriteriaTextConclusion : string = '';

    if (resultCriteria) {
        resultCriteriaTextVerification = 'Atendido';
        resultCriteriaTextConclusion = 'está dispensada';
    }
    else {
        resultCriteriaTextVerification = 'Não atendido';
        resultCriteriaTextConclusion = 'não está dispensada';
    }

    const resultStInput = await marked.parse(
        outputVariables(resultStInputMd, {
            structureFrequencyFn: formatNumber(structureFrequencyFn, 2),
            transversalDimensionL: formatNumber(transversalDimensionL, 2),
            strouhalNumberSt: formatNumber(strouhalNumberSt, 2),
            vCriticalSpeed: formatNumber(vCriticalSpeed, 2),
            vStructureSpeed: formatNumber(vStructureSpeed, 2),
            resultCriteriaTextVerification,
            resultCriteriaTextConclusion
        })
    )

    const resultStStandard = await marked.parse(
        outputVariables(resultStStandardMd, {
            structureFrequencyFn: formatNumber(structureFrequencyFn, 2),
            transversalDimensionL: formatNumber(transversalDimensionL, 2),
            strouhalNumberSt: formatNumber(strouhalNumberSt, 2),
            widthA: formatNumber(widthA, 2),
            lenghtB: formatNumber(lenghtB, 2),
            vCriticalSpeed: formatNumber(vCriticalSpeed, 2),
            vStructureSpeed: formatNumber(vStructureSpeed, 2),
            resultCriteriaTextVerification,
            resultCriteriaTextConclusion
        })
    )

    if (isNaN(vCriticalSpeed) || isNaN(vStructureSpeed)) {
        divResults.innerHTML = '';
    }
    else {
        divResults.innerHTML = resultStructureSpeedBase;
        resultAlreadyShown = true;
        if(windMode === true) divResults.innerHTML += windString;
        if(widthA !== 0 && lenghtB !== 0) {
            divResults.innerHTML += resultStStandard;
        }
        else divResults.innerHTML += resultStInput;
        
        divResults.style.border = '1px solid var(--text-color-input)';
        addChartPoint(vStructureSpeed, elevationZ);
        requestAnimationFrame(() => {
        addVcrLines(vCriticalSpeed);
        });
        printButton.style.display = 'block';
    }
}


export function wasResultAlreadyShown(): boolean {
  return resultAlreadyShown;
}

function outputVariables (template: string, variables: Record<string, string | number>): string {
    return template.replace(/\{\{(.*?)\}\}/g, (_, key) => {
        const value = variables[key.trim()];
        return value !== undefined ? String(value) : '';
    })
}
