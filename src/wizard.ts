import { getElement } from "./utils/dom";
import { wasResultAlreadyShown } from "./output";
import { debounce } from "./utils/validation";
import { getWindMode } from "./utils/windControl";
import { marked } from 'marked';

import step00 from "./assets/wizard/step-00.md?raw";
import step01 from "./assets/wizard/step-01.md?raw";
import step02 from "./assets/wizard/step-02.md?raw";
import step03 from "./assets/wizard/step-03.md?raw";
import step04 from "./assets/wizard/step-04.md?raw";
import step05 from "./assets/wizard/step-05.md?raw";
import step06 from "./assets/wizard/step-06.md?raw";
import step07 from "./assets/wizard/step-07.md?raw";
import step08 from "./assets/wizard/step-08.md?raw";
import step09 from "./assets/wizard/step-09.md?raw";
import step10 from "./assets/wizard/step-10.md?raw";
import step11 from "./assets/wizard/step-11.md?raw";
import step12 from "./assets/wizard/step-12.md?raw";
import step13 from "./assets/wizard/step-13.md?raw";
import step14 from "./assets/wizard/step-14.md?raw";
import step15 from "./assets/wizard/step-15.md?raw";


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

function parseWizardStep(md: string) {
    const lines = md.trim().split('\n');
    const title = lines[0].replace(/^# /, '').trim();
    const body = marked.parse(lines.slice(1).join('\n')) as string;
    return { title, text:body };
}

const wizardSteps: WizardStep[] = [
    {   //step 0
        ...parseWizardStep(step00),
        selector: '.main__title'
    },
    {   //step 1
        ...parseWizardStep(step01),
        selector: '.inputs--slenderness'
    },
    {   //step 2
        ...parseWizardStep(step02),
        selector: '#structure-height'
    },
    {   //step 3
        ...parseWizardStep(step03),
        selector: '#dimension-d0'
    },
    {   //step 4
        ...parseWizardStep(step04),
        selector: '.inputs--parameters'
    },
    {   //step 5
        ...parseWizardStep(step05),
        selector: '#input__speed-V0'
    },
    {   //step 6
        ...parseWizardStep(step06),
        selector: '#topographic-factor-S1'
    },
    {   //step 7
        ...parseWizardStep(step07),
        selector: '#input__structure-category'
    },
    {   //step 8
        ...parseWizardStep(step08),
        selector: '#elevation-Z'
    },
    {   //step 9
        ...parseWizardStep(step09),
        selector: '#statistical-factor-S3'
    },
    {   //step 10
        ...parseWizardStep(step10),
        selector: '#transversal-dimension-L'
    },
    {   //step 11
        ...parseWizardStep(step11),
        selector: '#structure-frequency-Fn'
    },
    {   //step 12
        ...parseWizardStep(step12),
        selector: '#strouhal-input'
    },
    {   //step 13
        ...parseWizardStep(step13),
        selector: '.result__graphic'
    },
    {   //step 14
        ...parseWizardStep(step14),
        selector: '.input__calculate--button'
    },
    {   //step 15 -- out of wizard
        ...parseWizardStep(step15),
        selector: '#speed-V0-wrapper'
    },
];

let currentStep = 0;
const wizardMaxIndex = wizardSteps.length - 2;
const resultGraphicSection = getElement<HTMLElement>('.result__graphic');

function showResultGraphicSection (target: string) : void {
    if (resultGraphicSection) {
        if (target === '.result__graphic') {
            resultGraphicSection.style.display = 'block';
        } else {
            resultGraphicSection.style.display = wasResultAlreadyShown() ? 'block' : 'none';
        }
    }
}

export function showWizardStep(index: number, hideNavigation : boolean = false) : void {
    const step = wizardSteps[index];
    const target = getElement<HTMLElement>(step.selector);
    
    showResultGraphicSection(step.selector);

    if (!target) {
        console.warn(`Elemento não encontrado: ${step.selector}`);
        return;
    }

    wizardTitle.textContent = step.title;
    wizardText.innerHTML = step.text;
    
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            //ressets the screen
            wizardContainer.style.top = '';
            wizardContainer.style.left = '';
            wizardContainer.style.right = '';
            wizardContainer.style.bottom = '';
            wizardContainer.style.height = '';
            wizardContainer.style.maxHeight = '';
            wizardContainer.style.overflow = '';
            wizardContainer.style.transform = '';
            wizardContainer.style.position = '';
            wizardContainer.style.maxWidth = '';

            const rect = target.getBoundingClientRect();

            wizardContainer.style.position = 'absolute';

            if (currentStep === 0) {
                wizardContainer.style.top = `20%`;
                wizardContainer.style.bottom = '';
                wizardContainer.style.height = '';
                wizardContainer.style.maxHeight = '';
                wizardContainer.style.overflow = '';
                wizardContainer.style.position = 'absolute';
                
                // Small screens
                if (window.innerWidth < 900) {
                    wizardContainer.style.left = `5%`;
                    wizardContainer.style.right = `5%`;
                    wizardContainer.style.maxWidth = `90vw`;
                    wizardContainer.style.transform = 'none';
                    wizardContainer.style.top = '30px';
                } else {
                    wizardContainer.style.left = `30%`;
                }
            }

            else {
                const isSmallScreen = window.innerWidth < 900;
                const targetTop = rect.top + window.scrollY;
                const targetBottom = rect.bottom + window.scrollY;
                const targetLeft = rect.left + window.scrollX;

                // Reset styles
                wizardContainer.style.top = '';
                wizardContainer.style.left = '';
                wizardContainer.style.right = '';
                wizardContainer.style.bottom = '';
                wizardContainer.style.transform = '';
                wizardContainer.style.position = '';

                // If small screeens OR if the element is out of the screen, wizard gets centralized
                if (index === 9 && getWindMode()) {
                    wizardContainer.style.position = 'fixed';
                    wizardContainer.style.left = '600px';
                    wizardContainer.style.bottom = '20px';
                    wizardContainer.style.transform = 'translateX(-50%)';
                    // Avoid cutting the wizard
                    const vpPadding = 24;
                    wizardContainer.style.maxHeight = `${window.innerHeight - vpPadding * 2}px`;
                    wizardContainer.style.overflow = 'auto';
                    wizardContainer.style.maxWidth = isSmallScreen ? '90vw' : '650px';
                    wizardContainer.style.width = 'auto';
                    wizardContainer.style.boxSizing = 'border-box';
                }
                else if (window.innerHeight < 900) {
                    if (isSmallScreen || targetBottom > window.innerHeight * 0.6) {
                        wizardContainer.style.position = 'fixed';
                        wizardContainer.style.bottom = '20px';
                        wizardContainer.style.left = '50%';
                        wizardContainer.style.transform = 'translateX(-50%)';
                    }
                } else {
                    wizardContainer.style.position = 'absolute';
                    wizardContainer.style.top = `${targetTop + 40}px`;
                    wizardContainer.style.left = `${targetLeft}px`;

                    if (step.selector === '.result__graphic') {
                        wizardContainer.style.left = `${targetLeft - 600}px`;
                    }
                }
            }

            clearHighlight();
            target.classList.add('wizard-highlight');

            if (hideNavigation) {
                backButton.style.display = 'none';
                nextButton.style.display = 'none';
            }
            else {
                if (index === 0) {
                    backButton.disabled = index === 0;
                    backButton.style.display = 'none';
                    nextButton.style.display = 'flex';
                }
                else if (index === wizardMaxIndex) {
                    nextButton.disabled = true;
                    backButton.disabled = false;
                    backButton.style.display = 'flex';
                    nextButton.style.display = 'none';
                }
                else {
                    backButton.disabled = false;
                    nextButton.disabled = false;
                    backButton.style.display = 'flex';
                    nextButton.style.display = 'flex';
                }
            }

        });
    });

}

export function setupWizard(): void {
    helpButton.addEventListener('click', () => {
        wizard.classList.remove('wizard--hidden');
        document.body.classList.add('modal-open');
        showWizardStep(0);
    });

    closeButton.addEventListener('click', () => {
        showResultGraphicSection('');
        closeWizard();
    });

    nextButton.addEventListener('click', () => {
        nextStep();
    });

    backButton.addEventListener('click', () => {
        backStep();
    });

    document.addEventListener('keydown', (event) => {
        if (wizard.classList.contains('wizard--hidden')) return;

        if (event.key === 'ArrowLeft') backStep();
        
        if (event.key === 'ArrowRight') nextStep();

        if (event.key === 'Escape') closeWizard();
    });

    const relayout = () => showWizardStep(currentStep);
    const relayoutDebounced = debounce(relayout, 0.1);

    window.addEventListener('resize', relayoutDebounced);
    window.addEventListener('orientationchange', () => setTimeout(relayout, 0));
}


export function clearHighlight(): void {
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
    currentStep = 0;
    wizard.classList.add('wizard--hidden');
    document.body.classList.remove('modal-open');
    showResultGraphicSection('');
    clearHighlight();
}

export function showWizardHelpStep(index: number): void {
    wizard.classList.remove('wizard--hidden');
    document.body.classList.add('modal-open');
    currentStep = index;
    showWizardStep(index, true);
}
