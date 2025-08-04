import { getElement } from './utils/dom';
import { validateNumber } from './utils/validation';

export function getParameter (idInput : string) : number {
    const input = getElement<HTMLInputElement>(idInput);

    let parameterNumber = Number(input.value);
    let errorMessage = validateNumber(parameterNumber);
    if (!errorMessage) {
        // console.log(`${idInput} = ${parameterNumber}`);
        return parameterNumber;
    }
    else {
        return 0;
    }
}

export function validateParameter (inputElement: HTMLInputElement): void {
    const container = inputElement.closest('.input__container');
    const span = container ? container.querySelector<HTMLSpanElement>('.input__warning') : null;
    inputElement.addEventListener('blur', () => {
        validateInput(inputElement, span)
    });

}

export function validateInput (inputElement: HTMLInputElement, span: HTMLSpanElement | null): boolean {   
    const emptyInput = inputElement.value.trim();

    if (span) {
        if (emptyInput === '') {
            span.innerText = '';
            inputElement.classList.remove('input__field--error');
            return false;
        }

        const parameterNumber = Number(inputElement.value);
        const errorMessage = validateNumber(parameterNumber);
        if (errorMessage) {
            span.innerText = errorMessage;
            span.classList.add('input__warning--show');
            inputElement.classList.add('input__field--error');
            return false;
        }
        else {
            span.innerText = '';
            inputElement.classList.remove('input__field--error');
            return true;
        }
    }

    return true; 
}
