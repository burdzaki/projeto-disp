import { getElement, getAllElements } from "./utils/dom";
import { debounce } from "./utils/validation";
import { getParameter, validateParameter } from "./input";
import { calculateSlenderness , VortexParameters} from "./calculation";
import { setFormatImage, setStrouhalCalculus , getStrouhalMode } from "./utils/strouhalControl";
import { showSlendernessResult, showCalculusResult } from "./output";
import { setWindCalculus, getWindMode, setWindLookup } from "./utils/windControl";
import { initializeChart, addChartPoint, cleanChartPoints, resetChartPoints, undoChartPoints, redoChartPoints } from "./utils/graphicControl";

initializeChart();

const buttonCalculate = getElement<HTMLButtonElement>('.input__button');
const numberInputs = getAllElements<HTMLInputElement>('.input__field');

const structureHeight = getElement<HTMLInputElement>('#structure-height');
const dimensionD0 = getElement<HTMLInputElement>('#dimension-d0');

const windSelection = getElement<HTMLSelectElement>('#speed-V0');
const windUserInput = getElement<HTMLElement>('.input--selection-speed-V0-user-input');
const windStandardValue = getElement<HTMLElement>('.input--selection-speed-V0-standard-value');

const elevationZInput = getElement<HTMLInputElement>('#elevation-Z');
const transversalDimensionLInput = getElement<HTMLInputElement>('#transversal-dimension-L');

const dropdownContainer = getElement<HTMLElement>('.dropdown');
const hiddenInputForm = getElement<HTMLInputElement>('#structure-format');
const windDirectionSection = getElement<HTMLElement>('.input--wind-direction');
const formatImage = getElement<HTMLImageElement>('#format-image');
const dimensionsSection = getElement<HTMLElement>('.input--structure-dimensions-AB');

const strouhalSelection = getElement<HTMLSelectElement>('#strouhal-input');
const strouhalUserInputSection = getElement<HTMLElement>('.input--selection-strouhal-user-input');
const strouhalStandardValueSection = getElement<HTMLElement>('.input--selection-strouhal-standard-value');

const stateSelect = getElement<HTMLSelectElement>('#speed-V0-standard-value__stateSelect');
const citySelect = getElement<HTMLSelectElement>('#speed-V0-standard-value__citySelect');
const standardV0 = getElement<HTMLInputElement>('#speed-V0-standard-value');

const undoChart = getElement<HTMLButtonElement>('#result__output__graphic__button--undo');
const redoChart = getElement<HTMLButtonElement>('#result__output__graphic__button--redo');
const cleanChart = getElement<HTMLButtonElement>('#result__output__graphic__button--clean');
const resetChart = getElement<HTMLButtonElement>('#result__output__graphic__button--reset');

console.log("Main loaded!");

numberInputs.forEach((input => {
    validateParameter(input);
}));

structureHeight.addEventListener('input', debounce(verifySlenderness));
dimensionD0.addEventListener('input', debounce(verifySlenderness));

function verifySlenderness() {
    const h : number = getParameter('#structure-height');
    const d0 : number = getParameter('#dimension-d0');
    let slenderdeness : number = 0;

    if (h > 0 && d0 > 0) {
        slenderdeness = calculateSlenderness(h, d0);
        elevationZInput.value = h.toString();
        transversalDimensionLInput.value = d0.toString();
    }
    showSlendernessResult(slenderdeness);
}

setWindCalculus(windSelection, windUserInput, windStandardValue);
setWindLookup(stateSelect, citySelect, standardV0);

setStrouhalCalculus(strouhalSelection, strouhalUserInputSection, strouhalStandardValueSection);
setFormatImage(dropdownContainer, hiddenInputForm, windDirectionSection, dimensionsSection, formatImage);

buttonCalculate.addEventListener('click', () => {

    let speedV0 : number = 0;

    const windMode = getWindMode();

    if (windMode === true) {
        speedV0 = getParameter('#speed-V0-standard-value');
    }
    else {
        speedV0 = getParameter('#speed-V0-user-input');
    }

    const topographicFactorS1 : number = getParameter('#topographic-factor-S1');
    const statisticalFactorS3 : number = getParameter('#statistical-factor-S3');

    const structureFrequencyFn : number = getParameter('#structure-frequency-Fn');

    const selectedFormat = hiddenInputForm.value;

    const widthA : number = getParameter('#width-A');
    const lenghtB : number = getParameter('#lenght-B');

    const structureCategory = getElement<HTMLSelectElement>('#structure-category');

    const windDirection = getElement<HTMLSelectElement>('#wind-direction');

    let elevationZ = Number(elevationZInput.value);
    let transversalDimensionL = Number(transversalDimensionLInput.value);

    const strouhalMode = getStrouhalMode();
    const strouhalUserInput = getParameter('#strouhal-user-input');

    const vortexCalculus = new VortexParameters(speedV0, topographicFactorS1, statisticalFactorS3, elevationZ, structureCategory.value, structureFrequencyFn, transversalDimensionL, selectedFormat, windDirection.value, widthA, lenghtB, strouhalMode, strouhalUserInput);

    vortexCalculus.calculateFactorS2();
    const vStructureSpeed = vortexCalculus.calculateStructureSpeed();
    vortexCalculus.calculateStrouhalNumber();
    const vCriticalSpeed = vortexCalculus.calculateVcrSpeed();
    const criteriaResult = vortexCalculus.calculateVortexSheddingCriteria();
    vortexCalculus.showAllParameters();

    showCalculusResult(criteriaResult, vCriticalSpeed, vStructureSpeed);
    console.log(`criteriaResult = ${criteriaResult}, vCriticalSpeed = ${vCriticalSpeed}, vStructureSpeed = ${vStructureSpeed}`)

    addChartPoint(elevationZ, transversalDimensionL);
});

cleanChart.addEventListener('click', () => {
    cleanChartPoints();
});

resetChart.addEventListener('click', () => {
    resetChartPoints();
});

undoChart.addEventListener('click', () => {
    undoChartPoints();
});

redoChart.addEventListener('click', () => {
    redoChartPoints();
});
