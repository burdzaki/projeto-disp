import { getElement } from './utils/dom';
import { addChartPoint } from './utils/graphicControl';

const divResults = getElement<HTMLDivElement>('.result__output__criteria');
const divSlenderness = getElement<HTMLDivElement>('.result__output__slenderness');
let resultAlreadyShown = false;

export function showSlendernessResult (slenderness : number) : void {
    const slendernessRatio = Number(slenderness.toFixed(2));
    divSlenderness.innerText = ''; //remover no final
    if (isNaN(slendernessRatio) || slendernessRatio === 0) {
        divSlenderness.innerText = '';
    }
    else if (slendernessRatio > 0 && slendernessRatio < 6) {
        divSlenderness.innerText = (`A esbeltez calculada possui valor ${slendernessRatio}: de acordo com o Item 10.2 da NBR 6123:2023, a estrutura está dispensada da verificação dos efeitos de despredimento de vórtices.`);
    }
    else if (slendernessRatio >= 6) {
        divSlenderness.innerText = (`A esbeltez calculada possui valor ${slendernessRatio}: e acordo com o Item 10.2 da NBR 6123:2023, o critério de dispensa da estrutura deve ser calculado.`);
    }
    else divSlenderness.innerText = '';
}

export function showCalculusResult (structureHeight: number, dimensionD0: number, slenderness: number, structureCategory: string, elevationZ: number, speedV0: number, topographicFactorS1: number, meteorologicalParameterBm: number, exponentP: number, roughnessFactorS2: number, statisticalFactorS3: number, structureFrequencyFn: number, vStructureSpeed: number, vCriticalSpeed: number, transversalDimensionL: number, strouhalNumberSt: number, resultCriteria: boolean ): void {
    
    divResults.innerHTML = ''; //remover no final
    const CriticalSpeed = Number(vCriticalSpeed.toFixed(2));
    const StructureSpeed = Number(vStructureSpeed.toFixed(2));
    const strouhalNumber = Number(strouhalNumberSt.toFixed(2));
    const s2Factor = Number(roughnessFactorS2.toFixed(2));
    const s3Factor = Number(statisticalFactorS3.toFixed(2));
    const bm = Number(meteorologicalParameterBm.toFixed(2));

    const speedRatio = CriticalSpeed / StructureSpeed;

    const resultStructureSpeed: string = `
    <h3>Memória de Cálculo – Critério para verificação do efeito de desprendimento de vórtices</h3>
    <br><p><strong>NBR 6123:2023 – Verificação de dispensa de investigação dos efeitos de desprendimento de vórtices de estruturas</strong></p>
    <br><p>Cálculos efetuados de acordo com os Itens 10.2 e 10.3 da Norma.</p>
    <br><hr>

    <br><h4>1. Parâmetros de Entrada</h4>
    <br><p>&emsp;Altura da edificação (h) = ${structureHeight} m</p>
    <p>&emsp;Menor dimensão transversal (d0) = ${dimensionD0} m</p>
    <p>&emsp;Esbeltez = ${slenderness.toFixed(2)}</p>
    <br>
    <p>&emsp;Categoria de tugosidade do terreno ${structureCategory}</p>
    <p>&emsp;Elevação da edificação (Z) = ${elevationZ} m</p>
    <p>&emsp;Velocidade básica (V0) = ${speedV0} m/s</p>
    <p>&emsp;Fator topográfico S1 = ${topographicFactorS1}</p> 
    <p>&emsp;Fator S2 = ${s2Factor}</p>
        <p>&emsp;&emsp;&emsp;Parâmetro metereológico bm = ${bm}</p>
        <p>&emsp;&emsp;&emsp;Expoente p = ${exponentP}</p>
        <p>&emsp;&emsp;&emsp;Fator de rajada = 0,69</p>
    <p>&emsp;Fator estatístico S3 = ${s3Factor}</p>
    
    <br><p><b>&emsp;Velocidade considerada na estrutura (Vest) = ${StructureSpeed} m/s</b></p>
    <br><hr>

    <br><h4>2. Cálculo da Velocidade Crítica (Vcr)</h4>
    <br><p>&emsp;Frequência natural da estrutura (Fn) = ${structureFrequencyFn} Hz</p>
    <p>&emsp;Dimensão característica da seção transversal (L) = ${transversalDimensionL} m</p>
    <p>&emsp;Número de Strouhal (St) = ${strouhalNumber}</p>
    <br><p><b>&emsp;Velocidade crítica do vento (Vcr) = ${CriticalSpeed} m/s</b></p>
    <br><hr>

    <br><h4>3. Verificação Final</h4>
    <p>&emsp;Critério: Vcr > Vest → ${CriticalSpeed} > ${StructureSpeed} → ${resultCriteria ? 'Atendido' : 'Não atendido'}</p>

    <br><h4>4. Conclusão</h4>
    <p>&emsp;A estrutura analisada ${resultCriteria ? '<strong>está dispensada</strong>' : '<strong>não está dispensada</strong>'} da verificação dos efeitos de desprendimento de vórtices.</p>
  `;

    if (isNaN(CriticalSpeed) || isNaN(StructureSpeed)) {
        divResults.innerHTML = '';
    }
    else {
        divResults.innerHTML = resultStructureSpeed;
        divResults.style.border = '1px solid var(--text-color-input';
        addChartPoint(structureFrequencyFn, speedRatio);
        resultAlreadyShown = true;
    }
}

export function wasResultAlreadyShown(): boolean {
  return resultAlreadyShown;
}
