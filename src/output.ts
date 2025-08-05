import { getElement } from './utils/dom';
import { formatNumber } from './utils/format';
import { addChartPoint } from './utils/graphicControl';

const divResults = getElement<HTMLDivElement>('.result__output__criteria');
const divSlenderness = getElement<HTMLDivElement>('.result__output__slenderness');
const printButton = getElement<HTMLButtonElement>('.result__output-print');

let resultAlreadyShown = false;

export function showSlendernessResult (slenderness : number) : void {
    const slendernessRatio = Number(slenderness.toFixed(2));
    const slendernessFormatedd = slenderness.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    divSlenderness.innerHTML = ''; //remover no final
    if (isNaN(slendernessRatio) || slendernessRatio === 0) {
        divSlenderness.innerHTML = '';
    }
    else if (slendernessRatio > 0 && slendernessRatio < 6) {
        divSlenderness.innerHTML = (`<p>A esbeltez calculada possui valor ${slendernessFormatedd}: de acordo com o Item 10.2 da NBR 6123:2023, a estrutura está dispensada da verificação dos efeitos de despredimento de vórtices.</p>`);
    }
    else if (slendernessRatio >= 6) {
        divSlenderness.innerHTML = (`<p>A esbeltez calculada possui valor ${slendernessFormatedd}: e acordo com o Item 10.2 da NBR 6123:2023, o critério de dispensa da estrutura deve ser calculado.</p>`);
    }
    else divSlenderness.innerHTML = '';
}

export function showCalculusResult (structureHeight: number, dimensionD0: number, slenderness: number, structureCategory: string, elevationZ: number, speedV0: number, topographicFactorS1: number, meteorologicalParameterBm: number, exponentP: number, roughnessFactorS2: number, statisticalFactorS3: number, structureFrequencyFn: number, vStructureSpeed: number, vCriticalSpeed: number, transversalDimensionL: number, strouhalNumberSt: number, resultCriteria: boolean, widthA: number, lenghtB: number): void {
    
    divResults.innerHTML = ''; //remover no final

    const speedRatio = vCriticalSpeed / vStructureSpeed;

    const resultStructureSpeedBase: string = `
        <h3>Memória de Cálculo – Critério para verificação do efeito de desprendimento de vórtices</h3>
        <br><p><strong>NBR 6123:2023 – Verificação de dispensa de investigação dos efeitos de desprendimento de vórtices de estruturas</strong></p>
        <br><p>Cálculos efetuados de acordo com os Itens 10.2 e 10.3 da Norma.</p>
        <br><hr>

        <br><h4>1. Cálculo da velocidade do vento na estrutura (Vest)</h4>
        <br><p>&emsp;Altura da edificação (h) = ${formatNumber(structureHeight, 2)} m</p>
        <p>&emsp;Menor dimensão transversal (d0) = ${formatNumber(dimensionD0, 2)} m</p>
        <p>&emsp;Esbeltez = ${formatNumber(slenderness, 2)}</p>
        <br>
        <p>&emsp;Categoria de rugosidade do terreno ${structureCategory}</p>
        <p>&emsp;Elevação da edificação (Z) = ${formatNumber(elevationZ, 2)} m</p>
        <p>&emsp;Velocidade básica (V0) = ${formatNumber(speedV0, 2)} m/s</p>
        <p>&emsp;Fator topográfico S1 = ${formatNumber(topographicFactorS1, 2)}</p> 
        <p>&emsp;Fator S2 = ${formatNumber(roughnessFactorS2, 2)}</p>
            <p>&emsp;&emsp;&emsp;Parâmetro metereológico bm = ${formatNumber(meteorologicalParameterBm)}</p>
            <p>&emsp;&emsp;&emsp;Expoente p = ${formatNumber(exponentP)}</p>
            <p>&emsp;&emsp;&emsp;Fator de rajada = 0,69</p>
        <p>&emsp;Fator estatístico S3 = ${formatNumber(statisticalFactorS3)}</p>
        
        <br><p><b>&emsp;Vest = ${formatNumber(vStructureSpeed, 2)} m/s</b></p>
        <br><hr>
    `;

    const resultStInput: string = `
        <br><h4>2. Cálculo da velocidade crítica do vento (Vcr)</h4>
        <br><p>&emsp;Frequência natural da estrutura (Fn) = ${formatNumber(structureFrequencyFn, 2)} Hz</p>
        <p>&emsp;Dimensão característica da seção transversal (L) = ${formatNumber(transversalDimensionL, 2)} m</p>
        <p>&emsp;Número de Strouhal (St) = ${formatNumber(strouhalNumberSt, 2)}</p>
        <br><p><b>&emsp;Vcr = ${formatNumber(vCriticalSpeed, 2)} m/s</b></p>
        <br><hr>

        <br><h4>3. Verificação Final</h4>
        <br><p>&emsp;Critério: <strong>Vcr > Vest</strong> → ${formatNumber(vCriticalSpeed, 2)} > ${formatNumber(vStructureSpeed, 2)} → ${resultCriteria ? '<strong>Atendido</strong>' : '<strong>Não atendido</strong>'}</p>
        <br>
        <br><h4>4. Conclusão</h4>
        <br><p>&emsp;A estrutura analisada ${resultCriteria ? '<strong>está dispensada</strong>' : '<strong>não está dispensada</strong>'} da verificação dos efeitos de desprendimento de vórtices.</p>
    `;

    const resultStStandard: string = `
        <br><h4>2. Cálculo da velocidade crítica do vento (Vcr)</h4>
        <br><p>&emsp;Frequência natural da estrutura (Fn) = ${formatNumber(structureFrequencyFn, 2)} Hz</p>
        <p>&emsp;Dimensão característica da seção transversal (L) = ${formatNumber(transversalDimensionL, 2)} m</p>
        <p>&emsp;Número de Strouhal (St) = ${formatNumber(strouhalNumberSt, 2)}</p>
            <p>&emsp;&emsp;&emsp;Dimensão a = ${formatNumber(widthA, 2)} m</p>
            <p>&emsp;&emsp;&emsp;Dimensão b = ${formatNumber(lenghtB, 2)} m</p>
        <br><p><b>&emsp;Vcr = ${formatNumber(vCriticalSpeed, 2)} m/s</b></p>
        <br><hr>

        <br><h4>3. Verificação Final</h4>
        <br><p>&emsp;Critério: <strong>Vcr > Vest</strong> → ${formatNumber(vCriticalSpeed, 2)} > ${formatNumber(vStructureSpeed, 2)} → ${resultCriteria ? '<strong>Atendido</strong>' : '<strong>Não atendido</strong>'}</p>
        <br>
        <br><h4>4. Conclusão</h4>
        <br><p>&emsp;A estrutura analisada ${resultCriteria ? '<strong>está dispensada</strong>' : '<strong>não está dispensada</strong>'} da verificação dos efeitos de desprendimento de vórtices.</p>
    `;

    if (isNaN(vCriticalSpeed) || isNaN(vStructureSpeed)) {
        divResults.innerHTML = '';
    }
    else {
        divResults.innerHTML = resultStructureSpeedBase;
        if(widthA !== 0 && lenghtB !== 0) {
            divResults.innerHTML += resultStStandard;
        }
        else divResults.innerHTML += resultStInput;
        divResults.style.border = '1px solid var(--text-color-input)';
        addChartPoint(structureFrequencyFn, speedRatio);
        printButton.style.display = 'block';
        resultAlreadyShown = true;
    }
}

export function wasResultAlreadyShown(): boolean {
  return resultAlreadyShown;
}
