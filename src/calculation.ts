import { calculateST } from "./utils/strouhalcalculation";

export function calculateSlenderness (structureHeight: number, dimensionD0: number) : number {
    let slenderdeness = structureHeight / dimensionD0;
    if (structureHeight > 0 && dimensionD0 > 0) {
        return slenderdeness;
    }
    else if ((isNaN(slenderdeness) || slenderdeness === 0)) {
        return 0;
    }
    else return -1;
};

export class VortexParameters {


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

    constructor(speedV0: number, topographicFactorS1: number, statisticalFactorS3: number, elevationZ: number, structureCategory: string, structureFrequencyFn: number, transversalDimensionL: number, structureForm: string, windDirection: string, widthA: number, lenghtB: number) {
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
        this.strouhalNumberSt = calculateST(this.structureForm, this.windDirection, this.widthA, this.lenghtB);
        return this.strouhalNumberSt;
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
