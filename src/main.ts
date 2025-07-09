import { getElement, getAllElements } from "./utils/dom";
import { debounce } from "./utils/validation";
import { getParameter, validateParameter } from "./input";
import { calculateSlenderness , VortexParameters} from "./calculation";
import { setFormatImage, setStrouhalCalculus , getStrouhalMode } from "./utils/formatControl";
import { showSlendernessResult, showCalculusResult } from "./output";

const buttonCalculate = getElement<HTMLButtonElement>('.input__button');
const numberInputs = getAllElements<HTMLInputElement>('.input__field');

const structureHeight = getElement<HTMLInputElement>('#structure-height');
const dimensionD0 = getElement<HTMLInputElement>('#dimension-d0');

const elevationZInput = getElement<HTMLInputElement>('#elevation-Z');
const transversalDimensionLInput = getElement<HTMLInputElement>('#transversal-dimension-L');

const structureForm = getElement<HTMLSelectElement>('#structure-format');
const windSection = getElement<HTMLElement>('.input--wind-direction');
const formatImage = getElement<HTMLImageElement>('#format-image');
const dimensionsSection = getElement<HTMLElement>('.input--structure-dimensions-AB');

const strouhalSelection = getElement<HTMLSelectElement>('#strouhal-input');
const strouhalUserInputSection = getElement<HTMLElement>('.input--selection-strouhal-user-input');
const strouhalStandardValueSection = getElement<HTMLElement>('.input--selection-strouhal-standard-value');

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

setStrouhalCalculus(strouhalSelection, strouhalUserInputSection, strouhalStandardValueSection);
setFormatImage(structureForm, windSection, dimensionsSection, formatImage);

buttonCalculate.addEventListener('click', () => {

    const speedV0 : number = getParameter('#speed-V0');
    const topographicFactorS1 : number = getParameter('#topographic-factor-S1');
    const statisticalFactorS3 : number = getParameter('#statistical-factor-S3');

    const structureFrequencyFn : number = getParameter('#structure-frequency-Fn');

    const widthA : number = getParameter('#width-A');
    const lenghtB : number = getParameter('#lenght-B');

    const structureCategory = getElement<HTMLSelectElement>('#structure-category');

    const windDirection = getElement<HTMLSelectElement>('#wind-direction');

    let elevationZ = Number(elevationZInput.value);
    let transversalDimensionL = Number(transversalDimensionLInput.value);

    const strouhalMode = getStrouhalMode();
    const strouhalUserInput = getParameter('#strouhal-user-input');

    const vortexCalculus = new VortexParameters(speedV0, topographicFactorS1, statisticalFactorS3, elevationZ, structureCategory.value, structureFrequencyFn, transversalDimensionL, structureForm.value, windDirection.value, widthA, lenghtB, strouhalMode, strouhalUserInput);

    vortexCalculus.calculateFactorS2();
    const vStructureSpeed = vortexCalculus.calculateStructureSpeed();
    vortexCalculus.calculateStrouhalNumber();
    const vCriticalSpeed = vortexCalculus.calculateVcrSpeed();
    const criteriaResult = vortexCalculus.calculateVortexSheddingCriteria();
    vortexCalculus.showAllParameters();

    showCalculusResult(criteriaResult, vCriticalSpeed, vStructureSpeed);
    console.log(`criteriaResult = ${criteriaResult}, vCriticalSpeed = ${vCriticalSpeed}, vStructureSpeed = ${vStructureSpeed}`)

});
