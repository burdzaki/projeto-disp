export function verificarEntrada (numeroParametro : number) : string | null {
    if (isNaN(numeroParametro)) return 'Campo vazio ou inválido.';
    if (numeroParametro === 0) return 'Campo vazio. Verifique.';
    if (numeroParametro < 0) return 'Valor negativo. Verifique.';
    return null;
}
