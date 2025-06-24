import { getElement } from "./utils/dom";
import { validateNumber } from "./utils/validation";

export function getParameter (idInput : string) : number {
    const input = getElement<HTMLInputElement>(idInput);

    let parameterNumber = Number(input.value);
    let errorMessage = validateNumber(parameterNumber);
    if (!errorMessage) {
        console.log(`${idInput} = ${parameterNumber}`);
        return parameterNumber;
    }
    else {
        return 0;
    }
}

export function validateParameter (inputElement : HTMLInputElement) : void {
    const container = inputElement.closest('.input__container');
    const div = container ? container.querySelector<HTMLSpanElement>('.input__warning') : null;

    inputElement.addEventListener('blur', () => {
        const emptyInput = inputElement.value.trim();

        if (div) {
            if (emptyInput === '') {
                div.innerText = '';
                inputElement.classList.remove('input__field--error');
                return;
            }

            const parameterNumber = Number(inputElement.value);
            const errorMessage = validateNumber(parameterNumber);
            if (errorMessage) {
                div.innerText = errorMessage;
                div.classList.add('input__warning--show');
                inputElement.classList.add('input__field--error');
            }
            else {
                div.innerText = '';
                inputElement.classList.remove('input__field--error');
            }
        }
    }); 
}
