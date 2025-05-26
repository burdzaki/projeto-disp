export function getElement<T extends Element>(selector: string) {
    const element = document.querySelector(selector);
    if (!element) {
        throw new Error (`Element not found ${selector}`);
    }
    return element as T;
}
