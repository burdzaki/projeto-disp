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

export function validateParameter (idInput : string, idDiv : string) : void {
    const input = getElement<HTMLInputElement>(idInput);
    const div = getElement<HTMLDivElement>(idDiv);

    input.addEventListener('blur', () => {
        const emptyInput = input.value.trim();

        if (emptyInput === '') {
            div.innerText = '';
            input.classList.remove('input__field--error');
            return;
        }

        const parameterNumber = Number(input.value);
        const errorMessage = validateNumber(parameterNumber);
        if (errorMessage) {
            div.innerText = errorMessage;
            div.classList.add('input__warning--show');
            input.classList.add('input__field--error');
        }
        else {
            div.innerText = '';
            input.classList.remove('input__field--error');
        }
    });
}
