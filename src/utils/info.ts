import { getElement } from "./dom";
import { clearHighlight } from "../wizard";
import { marked } from 'marked';

import info from "../assets/info.md?raw";

const closeButton = getElement<HTMLButtonElement>('.about-modal__close');
const hideInfo = getElement<HTMLElement>('#about-modal');

export function showInfo(): void {
    const infoLines = info.trim().split('\n');
    const infoText = marked.parse(infoLines.slice(0).join('\n')) as string;

    const infoTextContainer = getElement<HTMLElement>('#about-modal__text');
    if (infoTextContainer) {
        infoTextContainer.innerHTML = infoText;
    }

    getElement<HTMLElement>('.about-modal__container')
        hideInfo?.classList.remove("about-modal--hidden");


    closeButton.addEventListener('click', () => {
        hideInfo?.classList.add("about-modal--hidden");
        // ALTERADO: REMOVIDO MODAL-OPEN
        document.body.classList.remove('modal-open');
        clearHighlight();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') hideInfo?.classList.add("about-modal--hidden");
        document.body.classList.remove('modal-open');
    });
    
}
