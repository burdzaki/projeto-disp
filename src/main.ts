import { getElement, getAllElements } from './utils/dom';
import { debounce } from './utils/validation';
import { getParameter, validateParameter } from './input';
import { calculateSlenderness , VortexParameters} from './calculation';
import { setFormatImage, setStrouhalCalculus , getStrouhalMode } from './utils/strouhalControl';
import { showSlendernessResult, showCalculusResult } from './output';
import { setWindCalculus, getWindMode, setWindLookup } from './utils/windControl';
import { initializeChart } from './utils/graphicControl';
import { setupWizard, showWizardHelpStep } from './wizard';

const buttonCalculate = getElement<HTMLButtonElement>('.input__calculate--button');
const numberInputs = getAllElements<HTMLInputElement>('.input__field');

const structureHeight = getElement<HTMLInputElement>('#structure-height');
const dimensionD0 = getElement<HTMLInputElement>('#dimension-d0');

const windSelection = getElement<HTMLSelectElement>('#speed-V0');
const windUserInput = getElement<HTMLElement>('.input--selection-speed-V0-user-input');
const windStandardValue = getElement<HTMLElement>('.input--selection-speed-V0-standard-value');

const elevationZInput = getElement<HTMLInputElement>('#elevation-Z');
const transversalDimensionLInput = getElement<HTMLInputElement>('#transversal-dimension-L');

const dropdownContainer = getElement<HTMLElement>('.dropdown');
const hiddenInputForm = getElement<HTMLInputElement>('#structure-format');
const windDirectionSection = getElement<HTMLElement>('.input--wind-direction');
const formatImage = getElement<HTMLImageElement>('#format-image');
const dimensionsSection = getElement<HTMLElement>('.input--structure-dimensions-AB');

const strouhalSelection = getElement<HTMLSelectElement>('#strouhal-input');
const strouhalUserInputSection = getElement<HTMLElement>('.input--selection-strouhal-user-input');
const strouhalStandardValueSection = getElement<HTMLElement>('.input--selection-strouhal-standard-value');

const stateSelect = getElement<HTMLSelectElement>('#speed-V0-standard-value__state-select');
const citySelect = getElement<HTMLSelectElement>('#speed-V0-standard-value__city-select');
const standardV0 = getElement<HTMLInputElement>('#speed-V0-standard-value');


initializeChart();
setupWizard();

document.addEventListener('DOMContentLoaded', () => {
  const helpButton = document.querySelectorAll<HTMLButtonElement>('[data-step]');

  helpButton.forEach(button => {
    button.addEventListener('click', () => {
      const step = parseInt(button.dataset.step || '');
      if (!isNaN(step)) {
        showWizardHelpStep(step);
      }
    });
  });
});

console.log('Main loaded!');

numberInputs.forEach((input => {
    validateParameter(input);
}));

structureHeight.addEventListener('input', debounce(verifySlenderness));
dimensionD0.addEventListener('input', debounce(verifySlenderness));

function verifySlenderness(): { h: number; d0: number; slenderness: number } {
    const h : number = getParameter('#structure-height');
    const d0 : number = getParameter('#dimension-d0');
    let slenderness : number = 0;

    if (h > 0 && d0 > 0) {
        slenderness = calculateSlenderness(h, d0);
        if (!elevationZInput.value) {
            elevationZInput.value = h.toString(); // Só preenche Z se estiver vazio
        }

        if (!transversalDimensionLInput.value) {
            transversalDimensionLInput.value = d0.toString(); // Mesmo para L
        }
    }
    showSlendernessResult(slenderness);
    return { h, d0, slenderness }
}

setWindCalculus(windSelection, windUserInput, windStandardValue);
setWindLookup(stateSelect, citySelect, standardV0);

setStrouhalCalculus(strouhalSelection, strouhalUserInputSection, strouhalStandardValueSection);
setFormatImage(dropdownContainer, hiddenInputForm, windDirectionSection, dimensionsSection, formatImage);

buttonCalculate.addEventListener('click', () => {
  
  let speedV0 : number = 0;

  const windMode = getWindMode();

  if (windMode === true) {
      speedV0 = getParameter('#speed-V0-standard-value');
  }
  else {
      speedV0 = getParameter('#speed-V0-user-input');
  }

  const topographicFactorS1 : number = getParameter('#topographic-factor-S1');
  const statisticalFactorS3 : number = getParameter('#statistical-factor-S3');

  const structureFrequencyFn : number = getParameter('#structure-frequency-Fn');

  const selectedFormat = hiddenInputForm.value;

  const widthA : number = getParameter('#width-A');
  const lenghtB : number = getParameter('#lenght-B');

  const structureCategory = getElement<HTMLSelectElement>('#structure-category');

  const windDirection = getElement<HTMLSelectElement>('#wind-direction');

  let elevationZ = Number(elevationZInput.value);
  let transversalDimensionL = Number(transversalDimensionLInput.value);

  const strouhalMode = getStrouhalMode();
  const strouhalUserInput = getParameter('#strouhal-user-input');

  const vortexCalculus = new VortexParameters(speedV0, topographicFactorS1, statisticalFactorS3, elevationZ, structureCategory.value, structureFrequencyFn, transversalDimensionL, selectedFormat, windDirection.value, widthA, lenghtB, strouhalMode, strouhalUserInput);

  const parametersS2 = vortexCalculus.calculateFactorS2();
  const vStructureSpeed = vortexCalculus.calculateStructureSpeed();
  const strouhalNumber = vortexCalculus.calculateStrouhalNumber();
  const vCriticalSpeed = vortexCalculus.calculateVcrSpeed();
  const criteriaResult = vortexCalculus.calculateVortexSheddingCriteria();
  // vortexCalculus.showAllParameters();

  const resultSlenderness = verifySlenderness();

  showCalculusResult(resultSlenderness.h, resultSlenderness.d0, resultSlenderness.slenderness, structureCategory.value, elevationZ, speedV0, topographicFactorS1, parametersS2.bm, parametersS2.p, parametersS2.s2, statisticalFactorS3, structureFrequencyFn, vStructureSpeed, vCriticalSpeed, transversalDimensionL, strouhalNumber, criteriaResult);
  console.log(`criteriaResult = ${criteriaResult}, vCriticalSpeed = ${vCriticalSpeed}, vStructureSpeed = ${vStructureSpeed}`)

});
