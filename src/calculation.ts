import { interpolateNumbers } from "./utils/interpolation";

export class VortexParameters {
    structureHeight: number;
    dimensionD0: number;
    slenderness: number = 0;

    speedV0: number;
    topographicFactorS1: number;
    statisticalFactorS3: number;
    
    gustFactorFr: number = 0.69;
    elevationZ: number;
    structureCategory: string;
    exponentP: { [key: string]: number};
    meteorologicalParameterBm : { [key: string]: number};
    roughnessFactorS2: number = 0;

    structureSpeed: number = 0;
    VcrSpeed: number = 0;

    structureFrequencyFn: number;
    transversalDimensionL: number;
    strouhalNumberSt: number = 0;
    structureForm: string;
    windDirection: string;
    widthA: number;
    lenghtB: number;

    constructor(structureHeight: number, dimensionD0: number, speedV0: number, topographicFactorS1: number, statisticalFactorS3: number, elevationZ: number, structureCategory: string, structureFrequencyFn: number, transversalDimensionL: number, structureForm: string, windDirection: string, widthA: number, lenghtB: number) {
        this.structureHeight = structureHeight;
        this.dimensionD0 = dimensionD0;
        this.speedV0 = speedV0;
        this.topographicFactorS1 = topographicFactorS1;
        this.statisticalFactorS3 = statisticalFactorS3;
        this.elevationZ = elevationZ;
        this.structureCategory = structureCategory;
        this.structureFrequencyFn = structureFrequencyFn;
        this.transversalDimensionL = transversalDimensionL;
        this.structureForm = structureForm;
        this.windDirection = windDirection;
        this.widthA = widthA;
        this.lenghtB = lenghtB;

        this.exponentP = {
            "Category I": 0.095,
            "Category II": 0.15,
            "Category III": 0.185,
            "Category IV": 0.23,
            "Category V": 0.31,
        };

        this.meteorologicalParameterBm = {
            "Category I": 1.23,
            "Category II": 1,
            "Category III": 0.86,
            "Category IV": 0.71,
            "Category V": 0.50,
        };
        };

    calculateSlenderness () : string {
        this.slenderness = this.structureHeight / this.dimensionD0;
        if (this.slenderness >= 6) {
            return (`Esbeltez de ${this.slenderness}: os efeitos de desprendimento de vórtices devem ser investigados`);
        }
        else return (`Esbeltez de ${this.slenderness}: os efeitos de desprendimento de vórtices não necessitam ser investigados`);
    };

    calculateFactorS2 () : number {
        const bm = this.meteorologicalParameterBm[this.structureCategory];
        const p = this.exponentP[this.structureCategory];
        this.roughnessFactorS2 = bm * this.gustFactorFr * Math.pow(this.elevationZ / 10, p);
        return this.roughnessFactorS2;
    };

    calculateStructureSpeed () : number {
        if (this.roughnessFactorS2 === 0) {
            this.calculateFactorS2();
        }
        this.structureSpeed = 1.25 * this.speedV0 * this.topographicFactorS1 * this.roughnessFactorS2 * this.statisticalFactorS3;
        return this.structureSpeed;
    };

    calculateStrouhalNumber () : number {
        let dimensionFactor = this.lenghtB / this.widthA;;
        let y : number = 0;

        if (this.structureForm === "Circle") {
            return this.strouhalNumberSt = 0.20;
        }
        else if (this.structureForm === "Plate") {
            if (this.windDirection === "Horizontal") {
                return this.strouhalNumberSt = 0.16;
            }
            else if (this.windDirection === "Vertical") {
                return this.strouhalNumberSt = 0.15;
            }
        }
        else if (this.structureForm === "Rectangle") {
            switch (true) {
                case (dimensionFactor < 1):
                    return this.strouhalNumberSt = 0.12;
                case (1 <= dimensionFactor && dimensionFactor < 2):
                    y = interpolateNumbers(dimensionFactor, 1, 2, 0.12, 0.06);
                    return this.strouhalNumberSt = y;
                case (2 <= dimensionFactor && dimensionFactor < 3):
                    return this.strouhalNumberSt = 0.06;
                case (3 <= dimensionFactor && dimensionFactor < 3.5):
                    y = interpolateNumbers(dimensionFactor, 3, 3.5, 0.06, 0.15);
                    return this.strouhalNumberSt = y;
                case (3.5 <= dimensionFactor && dimensionFactor < 5):
                    y = interpolateNumbers(dimensionFactor, 3.5, 5, 0.15, 0.11);
                    return this.strouhalNumberSt = y;
                case (5 <= dimensionFactor && dimensionFactor < 10):
                    y = interpolateNumbers(dimensionFactor, 5, 10, 0.11, 0.09);
                    return this.strouhalNumberSt = y;
                case (dimensionFactor >= 10):
                    return this.strouhalNumberSt = 0.09;
            }
        }
        else if (this.structureForm === "H Form") {
            if (this.windDirection === "Horizontal") {
                switch (true) {
                    case (dimensionFactor < 1):
                        return this.strouhalNumberSt = 0.12;
                    case (1 <= dimensionFactor && dimensionFactor < 1.5):
                        y = interpolateNumbers(dimensionFactor, 1, 1.5, 0.12, 0.11);
                        return this.strouhalNumberSt = y;
                    case (1.5 <= dimensionFactor && dimensionFactor < 2):
                        y = interpolateNumbers(dimensionFactor, 1.5, 2, 0.11, 0.14);
                        return this.strouhalNumberSt = y; 
                    case (dimensionFactor >= 2):
                        return this.strouhalNumberSt = 0.14;
                }
            }
            else if (this.windDirection === "Vertical") {
                return this.strouhalNumberSt = 0.14;
            }
        }
        else if (this.structureForm === "U Form") {
            return this.strouhalNumberSt = 0.14;
        }
        else if (this.structureForm === "T Form") {
            switch (true) {
                case (dimensionFactor < 0.5):
                    return this.strouhalNumberSt = 0.15;
                case (0.5 <= dimensionFactor && dimensionFactor < 1):
                    y = interpolateNumbers(dimensionFactor, 0.5, 1, 0.15, 0.13);
                    return this.strouhalNumberSt = y;
                case (1 <= dimensionFactor && dimensionFactor < 2):
                    y = interpolateNumbers(dimensionFactor, 1, 2, 0.13, 0.08);
                    return this.strouhalNumberSt = y;
                case (dimensionFactor >= 2):
                        return this.strouhalNumberSt = 0.08;
            }
        }
        else if (this.structureForm === "L Form") {
            return this.strouhalNumberSt = 0.13;
        }
        return this.strouhalNumberSt = 0;
    };

    calculateVcrSpeed () : number {
        if (this.strouhalNumberSt === 0) {
            this.calculateStrouhalNumber();
        }
        this.VcrSpeed = (this.structureFrequencyFn * this.transversalDimensionL) / this.strouhalNumberSt;
        return this.VcrSpeed;
    };

    calculateVortexSheddingCriteria () : boolean {
        if (this.VcrSpeed > this.structureSpeed) {
            return true;
        }
        else return false;
    }
};
