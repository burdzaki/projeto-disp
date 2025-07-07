export function setFormatImage (structureForm: HTMLSelectElement, windSection: HTMLElement, dimensionsSection: HTMLElement, formatImage: HTMLImageElement) {
    const formatMap: { [key: string]: string } = {
        Circle: '/public/images//st/Circle.png',
        Plate: '/public/images//st/Plate.png'    ,
        Rectangle: '/public/images//st/Rectangle.png',
        HFormat: '/public/images//st/HFormat.png',
        UFormat: '/public/images//st/UFormat.png',
        TFormat: '/public/images//st/TFormat.png',
        LFormat: '/public/images//st/LFormat.png',
    };

    //update image
    structureForm.addEventListener('change', () => {
        const selectedFormat = structureForm.value;

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
}
