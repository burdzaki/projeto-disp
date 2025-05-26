import { getElement } from "./utils/dom";
import { getParameter, validateParameter } from "./input";
import { calculateParameters, calculateSlenderness } from "./calculation";
import { showCalculusResult, showSlendernessResult } from "./output";

const buttonCalculate = getElement<HTMLButtonElement>('.input__button');

validateParameter('#h', '#warning-h');
validateParameter('#d0', '#warning-d0');

validateParameter('#V0', '#warning-V0');
validateParameter('#S1', '#warning-S1');


buttonCalculate.addEventListener('click', () => {
    let h : number = getParameter('#h');
    let d0 : number = getParameter('#d0');
    let slendernessRatio : number = calculateSlenderness(h, d0);
    showSlendernessResult(slendernessRatio);

    let V0 : number = getParameter('#V0');
    let S1 : number = getParameter('#S1');
    let resultNumber : number = calculateParameters(V0, S1);
    showCalculusResult(resultNumber);
});
