import { getElement } from "./utils/dom";

export function setupWizard() : void {
    const wizard = getElement<HTMLElement>('#wizard');
    const helpButton = getElement<HTMLElement>('#header-link-help');
    const closeButton = getElement<HTMLElement>('#wizard__button--close');

    helpButton.addEventListener('click', () => {
        wizard.classList.remove('wizard--hidden');
    });

    closeButton.addEventListener('click', () => {
        wizard.classList.add('wizard--hidden');
    });
}