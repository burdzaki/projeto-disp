import { getElement } from "./dom";
import { clearHighlight } from "../wizard";
import { marked } from 'marked';

import license from "../assets/license.md?raw";

const closeButton = getElement<HTMLButtonElement>('.footer__terms--close');
const hideTerms = getElement<HTMLElement>('#footer-terms');

export function showLicense(): void {
    const licenseLines = license.trim().split('\n');
    const licenseText = marked.parse(licenseLines.slice(0).join('\n')) as string;

    const licenseTextContainer = getElement<HTMLElement>('#footer__terms__text');
    if (licenseTextContainer) {
        licenseTextContainer.innerHTML = licenseText;
    }

    getElement<HTMLElement>('.footer__terms__container')
        hideTerms?.classList.remove("footer__terms--hidden");

    closeButton.addEventListener('click', () => {
        hideTerms?.classList.add("footer__terms--hidden");
        document.body.classList.remove('modal-open');
        clearHighlight();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            hideTerms?.classList.add("about-modal--hidden");
            document.body.classList.remove('modal-open');
        }
    });
}
