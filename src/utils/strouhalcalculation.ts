import { interpolateNumbers } from './interpolation';

export function calculateST (structureForm : string, windDirection : string, widthA : number, lenghtB : number) : number {
    let dimensionFactor = lenghtB / widthA;
    console.log(`dimension factor = ${dimensionFactor}`);
    let y : number = 0;

    if (structureForm === 'Circle') {
        return 0.20;
    }
    else if (structureForm === 'Plate') {
        if (windDirection === 'Horizontal') {
            return 0.16;
        }
        else if (windDirection === 'Vertical') {
            return 0.15;
        }
    }
    else if (structureForm === 'Rectangle') {
        switch (true) {
            case (dimensionFactor < 1):
                return  0.12;
            case (1 <= dimensionFactor && dimensionFactor < 2):
                y = interpolateNumbers(dimensionFactor, 1, 2, 0.12, 0.06);
                return y;
            case (2 <= dimensionFactor && dimensionFactor < 3):
                return  0.06;
            case (3 <= dimensionFactor && dimensionFactor < 3.5):
                y = interpolateNumbers(dimensionFactor, 3, 3.5, 0.06, 0.15);
                return y;
            case (3.5 <= dimensionFactor && dimensionFactor < 5):
                y = interpolateNumbers(dimensionFactor, 3.5, 5, 0.15, 0.11);
                return y;
            case (5 <= dimensionFactor && dimensionFactor < 10):
                y = interpolateNumbers(dimensionFactor, 5, 10, 0.11, 0.09);
                return y;
            case (dimensionFactor >= 10):
                return 0.09;
        }
    }
    else if (structureForm === 'HFormat') {
        if (windDirection === 'Horizontal') {
            switch (true) {
                case (dimensionFactor < 1):
                    return 0.12;
                case (1 <= dimensionFactor && dimensionFactor < 1.5):
                    y = interpolateNumbers(dimensionFactor, 1, 1.5, 0.12, 0.11);
                    return y;
                case (1.5 <= dimensionFactor && dimensionFactor < 2):
                    y = interpolateNumbers(dimensionFactor, 1.5, 2, 0.11, 0.14);
                    return y; 
                case (dimensionFactor >= 2):
                    return 0.14;
            }
        }
        else if (windDirection === 'Vertical') {
            return 0.14;
        }
    }
    else if (structureForm === 'UFormat') {
        return 0.14;
    }
    else if (structureForm === 'TFormat') {
        switch (true) {
            case (dimensionFactor < 0.5):
                return 0.15;
            case (0.5 <= dimensionFactor && dimensionFactor < 1):
                y = interpolateNumbers(dimensionFactor, 0.5, 1, 0.15, 0.13);
                return y;
            case (1 <= dimensionFactor && dimensionFactor < 2):
                y = interpolateNumbers(dimensionFactor, 1, 2, 0.13, 0.08);
                return y;
            case (dimensionFactor >= 2):
                    return 0.08;
        }
    }
    else if (structureForm === 'LFormat') {
        return 0.13;
    }
    return 0;
};
