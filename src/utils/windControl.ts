import { windSpeeds } from './windSpeeds';

let windMode : boolean = false;

export function setWindCalculus(windSelection: HTMLSelectElement, windUserInput: HTMLElement, windStandardValue: HTMLElement) : void {

    windSelection.addEventListener('change', () => {
        const selectedWindInput = windSelection.value;
        if (selectedWindInput === 'wind-user-input') {
            windUserInput.style.display = 'flex';
            windStandardValue.style.display = 'none';
            windMode = false;
        }
        else if (selectedWindInput === 'wind-standard-value') {
            windStandardValue.style.display = 'block';
            windUserInput.style.display = 'none';
            windMode = true;
        }
    });
}

export function getWindMode () : boolean {
    return windMode;
}

export function setWindLookup (stateSelect: HTMLSelectElement, citySelect: HTMLSelectElement, standardV0: HTMLInputElement) : void {

    const states = Object.keys(windSpeeds).sort();
    stateSelect.innerHTML = "<option value='' disabled selected hidden>Estado</option>";
    states.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    });

    const cityWrapper = document.getElementById('city-wrapper');
    const speedv0Wrapper = document.getElementById('speed-V0-wrapper');

    if (!cityWrapper || !speedv0Wrapper) {
        console.error('city-wrapper ou speed-V0-wrapper não encontrados no DOM!');
        return; // cancela execução
    }

    stateSelect.addEventListener('change', () => {

        citySelect.innerHTML = "<option value='' disabled selected hidden>Cidade</option>";
        standardV0.value = '';
        cityWrapper.style.display = 'flex';
        speedv0Wrapper.style.display = 'none';


        const cities = Object.keys(windSpeeds[stateSelect.value]).sort();
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    });

    citySelect.addEventListener('change', () => {
        const state = stateSelect.value;
        const city = citySelect.value;
        const speedV0 = windSpeeds[state]?.[city];

        if (speedV0 !== undefined) {
            standardV0.value = speedV0.toString();
            speedv0Wrapper.style.display = 'block';
        }
        else {
            standardV0.value = '';
            speedv0Wrapper.style.display = 'none';
        }
    });
}
