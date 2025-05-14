export function getElement<T extends Element>(selector: string) {
    const element = document.querySelector(selector);
    if (!element) {
        throw new Error (`Elemento não encontrado ${selector}`);
    }
    return element as T;
}
