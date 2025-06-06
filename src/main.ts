import { getElement } from "./utils/dom";
import { getParameter, validateParameter } from "./input";
//import { calculateParameters, calculateSlenderness } from "./calculation";
import { showCalculusResult, showSlendernessResult } from "./output";

const buttonCalculate = getElement<HTMLButtonElement>('.input__button');

validateParameter('#structure-height', '#warning-structure-height');
validateParameter('#dimension-d0', '#warning-dimension-d0');

validateParameter('#speed-V0', '#warning-speed-V0');
validateParameter('#factor-S1', '#warning-factor-S1');


// buttonCalculate.addEventListener('click', () => {
//     let h : number = getParameter('#structure-height');
//     let d0 : number = getParameter('#dimension-d0');
//     let slendernessRatio : number = calculateSlenderness(h, d0);
//     showSlendernessResult(slendernessRatio);

//     let V0 : number = getParameter('#speed-V0');
//     let S1 : number = getParameter('#factor-S1');
//     let resultNumber : number = calculateParameters(V0, S1);
//     showCalculusResult(resultNumber);
// });
