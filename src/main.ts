import { getElement, getAllElements } from "./utils/dom";
import { debounce } from "./utils/validation";
import { getParameter, validateParameter } from "./input";
import { calculateSlenderness , VortexParameters} from "./calculation";
import { setFormatImage, setStrouhalCalculus } from "./utils/formatControl";
import { showSlendernessResult, showCalculusResult } from "./output";

const buttonCalculate = getElement<HTMLButtonElement>('.input__button');
const numberInputs = getAllElements<HTMLInputElement>('.input__field');

const structureHeight = getElement<HTMLInputElement>('#structure-height');
const dimensionD0 = getElement<HTMLInputElement>('#dimension-d0');

const elevationZ = getElement<HTMLInputElement>('#elevation-Z');
const transversalDimensionL = getElement<HTMLInputElement>('#transversal-dimension-L');

const structureForm = getElement<HTMLSelectElement>('#structure-format');
const windSection = getElement<HTMLElement>('.input--wind-direction');
const formatImage = getElement<HTMLImageElement>('#format-image');
const dimensionsSection = getElement<HTMLElement>('.input--structure-dimensions-AB');

const strouhalSelection = getElement<HTMLSelectElement>('#strouhal-input');
const strouhalUserInput = getElement<HTMLElement>('.input--selection-strouhal-user-input');
const strouhalStandardValue = getElement<HTMLElement>('.input--selection-strouhal-standard-value');

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
        elevationZ.value = h.toString();
        transversalDimensionL.value = d0.toString();
    }
    showSlendernessResult(slenderdeness);
}

setStrouhalCalculus(strouhalSelection, strouhalUserInput, strouhalStandardValue);
setFormatImage(structureForm, windSection, dimensionsSection, formatImage);

buttonCalculate.addEventListener('click', () => {

    const V0 : number = getParameter('#speed-V0');
    const S1 : number = getParameter('#topographic-factor-S1');

});
