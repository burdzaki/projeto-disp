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
        const inputVazio = input.value.trim();

        if (inputVazio === '') {
            div.innerText = '';
            input.classList.remove('entrada__campo--erro');
            return;
        }

        const numeroParametro = Number(input.value);
        const mensagemErro = verificarEntrada(numeroParametro);
        if (mensagemErro) {
            div.innerText = mensagemErro;
            div.classList.add('entrada__aviso--mostrar');
            input.classList.add('entrada__campo--erro');
        }
        else {
            div.innerText = '';
            input.classList.remove('entrada__campo--erro');
        }
    });
}
