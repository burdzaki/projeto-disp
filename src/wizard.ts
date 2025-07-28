import { getElement } from "./utils/dom";

const wizard = getElement<HTMLElement>('#wizard');
const wizardContainer = getElement<HTMLElement>('.wizard__container');
const wizardTitle = getElement<HTMLElement>('.wizard__title');
const wizardText = getElement<HTMLElement>('.wizard__text');
const helpButton = getElement<HTMLElement>('#header-link-help');
const closeButton = getElement<HTMLButtonElement>('#wizard__button--close');
const backButton = getElement<HTMLButtonElement>('#wizard__button--back');
const nextButton = getElement<HTMLButtonElement>('#wizard__button--next');

interface WizardStep {
    title: string;
    text: string;
    selector: string;
}

const wizardSteps: WizardStep[] = [
    {
        title: 'Início',
        text: 'Texto explicando o programa.',
        selector: '.main__title'
    },
    {
        title: 'Esbeltez',
        text: 'Texto explicando o cálculo da esbeltez',
        selector: '.inputs--slenderness'
    },
    {
        title: 'Altura h',
        text: 'Texto explicando o que h significa',
        selector: '#structure-height'
    },
    {
        title: 'Dimensão d0',
        text: 'Texto explicando o que d0 significa',
        selector: '#dimension-d0'
    },
];

let currentStep = 0;
const wizardMaxIndex = wizardSteps.length - 1;

function showWizardStep(index: number) : void {
    const step = wizardSteps[index];
    const target = getElement<HTMLElement>(step.selector);

    if (!target) {
        console.warn(`Elemento não encontrado: ${step.selector}`);
        return;
    }

    wizardTitle.textContent = step.title;
    wizardText.textContent = step.text;

    const rect = target.getBoundingClientRect();

    wizardContainer.style.position = 'absolute';
    if (currentStep === 0) {
        wizardContainer.style.top = `20%`;
        wizardContainer.style.left = `35%`;
    }
    else {
        wizardContainer.style.top = `${rect.top + window.scrollY + 40}px`;
        wizardContainer.style.left = `${rect.left + window.scrollX + 0}px`;
    }

    clearHighlight();
    target.classList.add('wizard-highlight');

    backButton.disabled = index === 0;
    nextButton.disabled = index === wizardMaxIndex;
}

export function setupWizard(): void {
    helpButton.addEventListener('click', () => {
        wizard.classList.remove('wizard--hidden');
        showWizardStep(0);
        console.log(`currentStep = ${currentStep}`);
    });

    closeButton.addEventListener('click', () => {
        closeWizard();
        console.log(`currentStep = ${currentStep}`);
    });

    nextButton.addEventListener('click', () => {
        nextStep();
        console.log(`currentStep = ${currentStep}`);
    });

    backButton.addEventListener('click', () => {
        backStep();
        console.log(`currentStep = ${currentStep}`);
    });

    document.addEventListener('keydown', (event) => {
        if (wizard.classList.contains('wizard--hidden')) return;

        if (event.key === 'ArrowLeft') backStep();
        
        if (event.key === 'ArrowRight') nextStep();

        if (event.key === 'Escape') closeWizard();
    });
}


function clearHighlight(): void {
    document.querySelectorAll('.wizard-highlight').forEach(element => {
        element.classList.remove('wizard-highlight');
    });
}

function backStep(): void {
    if (currentStep > 0) {
    currentStep--;
    showWizardStep(currentStep);
    }   
}

function nextStep(): void {
    if (currentStep < wizardMaxIndex) {
        currentStep++;
        showWizardStep(currentStep)
    }
}

function closeWizard(): void {
    wizard.classList.add('wizard--hidden');
    currentStep = 0;
    clearHighlight();
}
