export function getElement<T extends Element>(selector: string) {
    const element = document.querySelector(selector);
    if (!element) {
        throw new Error (`Element not found ${selector}`);
    }
    return element as T;
}

export function getAllElements<T extends Element>(selector: string): NodeListOf<T> {
    const elements = document.querySelectorAll<T>(selector);
    if (elements.length === 0) {
        throw new Error (`Element not found ${selector}`);
    }
    return elements;
}
