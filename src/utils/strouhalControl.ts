let strouhalMode : boolean = false;

export function setStrouhalCalculus (strouhalSelection: HTMLSelectElement, strouhalUserInput: HTMLElement, strouhalStandardValue: HTMLElement){
        
    strouhalSelection.addEventListener('change', () => {
        const selectedStrouhalInput = strouhalSelection.value;
        if (selectedStrouhalInput === 'StrouhalUserInput') {
            strouhalUserInput.style.display = 'flex';
            strouhalStandardValue.style.display = 'none';
            strouhalMode = false;
        }
        else if (selectedStrouhalInput === 'StrouhalStandardValue') {
            strouhalStandardValue.style.display = 'block';
            strouhalUserInput.style.display = 'none';
            strouhalMode = true;
        }
    });
}

export function getStrouhalMode() : boolean {
    return strouhalMode;
}

export function setFormatImage (dropdownContainer: HTMLElement, hiddenInput: HTMLInputElement, windSection: HTMLElement, dimensionsSection: HTMLElement, formatImage: HTMLImageElement) : void {

    const toggleDropdown = dropdownContainer.querySelector('.dropdown__toggle') as HTMLElement;
    const dropdownOptions = dropdownContainer.querySelectorAll('.dropdown__container-option');

    const formatMap: { [key: string]: string } = {
        Circle: '/images/st/Circle.png',
        Plate: '/images/st/Plate.png'    ,
        Rectangle: '/images/st/Rectangle.png',
        HFormat: '/images/st/HFormat.png',
        UFormat: '/images/st/UFormat.png',
        TFormat: '/images/st/TFormat.png',
        LFormat: '/images/st/LFormat.png',
    };

    //update image

    toggleDropdown.addEventListener('click', (event) => {
        event.stopPropagation();
        dropdownContainer.classList.toggle('open');
    });

    dropdownOptions.forEach(option => {
        option.addEventListener('click', () => {
            const selectedFormat = option.getAttribute('data-value') || '';
            hiddenInput.value = selectedFormat;

            //atualiza texto do toggle
            const selectedText = option.querySelector('img')?.nextSibling?.textContent?.trim() || '';
            toggleDropdown.innerText = selectedText;

            //fecha o dropwdown
            dropdownContainer.classList.remove('open');

        if (formatMap[selectedFormat]) {
            formatImage.src = formatMap[selectedFormat];
            formatImage.alt = `Forma da edificação: ${selectedFormat}`;
            formatImage.style.display = 'flex';
        }
        else formatImage.style.display = 'none';


        if (selectedFormat === 'Plate' || selectedFormat === 'HFormat') {
            windSection.style.display = 'flex';
        }
        else windSection.style.display = 'none';

        if (selectedFormat === 'HFormat' || selectedFormat === 'UFormat' || selectedFormat === 'TFormat' || selectedFormat === 'Rectangle') {
            dimensionsSection.style.display = 'block';
        }
        else dimensionsSection.style.display = 'none'; 

    });

    document.addEventListener('click', () => {
        dropdownContainer.classList.remove('open');
    });

    });
}
