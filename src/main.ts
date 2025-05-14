import { getElement } from "./utils/dom";
import { entrarParametro, validarParametro } from "./entrada";
import { calcularParametros, calcularEsbeltez } from "./calculo";
import { resultadoCalculo, resultadoEstelbez } from "./saida";

const botaoCalcular = getElement<HTMLButtonElement>('.entrada__botao');

validarParametro('#h', '#aviso-h');
validarParametro('#d0', '#aviso-d0');

validarParametro('#V0', '#aviso-V0');
validarParametro('#S1', '#aviso-S1');


botaoCalcular.addEventListener('click', () => {
    let h : number = entrarParametro('#h');
    let d0 : number = entrarParametro('#d0');
    let esbeltezCalculada : number = calcularEsbeltez(h, d0);
    resultadoEstelbez(esbeltezCalculada);

    let V0 : number = entrarParametro('#V0');
    let S1 : number = entrarParametro('#S1');
    let numeroCalculado : number = calcularParametros(V0, S1);
    resultadoCalculo(numeroCalculado);
});
