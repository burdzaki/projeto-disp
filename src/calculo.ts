export function calcularParametros (V0 : number, S1: number) : number {
    let verificacaoParametros : number = 1.25 * V0 * S1;
    return verificacaoParametros;
}

export function calcularEsbeltez (h : number, d0 : number) : number {
    let esbeltez : number = 0;
    if (h !== 0 && d0 !== 0) {
        esbeltez = h/d0;
        return esbeltez;
    }
    else return 0;
}
