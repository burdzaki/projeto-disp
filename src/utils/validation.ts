export function validateNumber (parameterNumber : number) : string | null {
    if (isNaN(parameterNumber)) return 'Campo vazio ou inválido.';
    if (parameterNumber === 0) return 'Campo vazio. Verifique.';
    if (parameterNumber < 0) return 'Valor negativo. Verifique.';
    if (parameterNumber === null) return null;
    return null;
}

export function debounce(func: (...args: any[]) => void){
    let timeout: ReturnType<typeof setTimeout>;
    let delay: number = 1000;

    return(...args: any[]) => {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            func(...args);
        }, delay);
    };
}
