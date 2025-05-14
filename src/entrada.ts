import { getElement } from "./utils/dom";
import { verificarEntrada } from "./utils/validacao";

export function entrarParametro (idInput : string) : number {
    const input = getElement<HTMLInputElement>(idInput);

    let numeroParametro = Number(input.value);
    let mensagemErro = verificarEntrada(numeroParametro);
    if (!mensagemErro) {
        console.log(`${idInput} = ${numeroParametro}`);
        return numeroParametro;
    }
    else {
        return 0;
    }
}

export function validarParametro (idInput : string, idDiv : string) : void {
    const input = getElement<HTMLInputElement>(idInput);
    const div = getElement<HTMLDivElement>(idDiv);

    input.addEventListener('blur', () => {
        let numeroParametro = Number(input.value);
        let mensagemErro = verificarEntrada(numeroParametro);
        if (mensagemErro) {
            div.innerText = mensagemErro;
            input.classList.add('entrada__campo--erro');
        }
        else {
            div.innerText = '' ;
            input.classList.remove('entrada__campo--erro');
        }
    });
}
