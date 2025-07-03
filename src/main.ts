import { getElement, getAllElements } from "./utils/dom";
import { debounce } from "./utils/validation";
import { getParameter, validateParameter } from "./input";
import { calculateSlenderness , VortexParameters} from "./calculation";
import { showSlendernessResult, showCalculusResult } from "./output";

const buttonCalculate = getElement<HTMLButtonElement>('.input__button');
const numberInputs = getAllElements<HTMLInputElement>('.input__field');

const structureHeight = getElement<HTMLInputElement>('#structure-height');
const dimensionD0 = getElement<HTMLInputElement>('#dimension-d0');

const elevationZ = getElement<HTMLInputElement>('#elevation-Z');
const transversalDimensionL = getElement<HTMLInputElement>('#transversal-dimension-L');

numberInputs.forEach((input => {
    validateParameter(input);
}));

structureHeight.addEventListener('input', debounce(verifySlenderness));
dimensionD0.addEventListener('input', debounce(verifySlenderness));

function verifySlenderness() {
    const h : number = getParameter('#structure-height');
    const d0 : number = getParameter('#dimension-d0');
    const slenderdeness = calculateSlenderness(h, d0);
    
    if (h > 0 && d0 > 0) {
        //const slenderdeness = calculateSlenderness(h, d0);
        elevationZ.value = h.toString();
        transversalDimensionL.value = d0.toString();
    }
    showSlendernessResult(slenderdeness);

}

buttonCalculate.addEventListener('click', () => {
    let h : number = getParameter('#structure-height');
    let d0 : number = getParameter('#dimension-d0');
    //let slendernessRatio : number = calculateSlenderness(h, d0);
    //showSlendernessResult(slendernessRatio);

    let V0 : number = getParameter('#speed-V0');
    let S1 : number = getParameter('#topographic-factor-S1');
    //let resultNumber : number = calculateParameters(V0, S1);
    //showCalculusResult(resultNumber);
});
