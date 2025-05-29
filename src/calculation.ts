export function calculateParameters (V0 : number, S1: number) : number {
    let resultCalculus : number = 1.25 * V0 * S1;
    return resultCalculus;
}

export function calculateSlenderness (h : number, d0 : number) : number {
    let slenderness : number = 0;
    if (h !== 0 && d0 !== 0) {
        slenderness = h/d0;
        return slenderness;
    }
    else return 0;
}

class VortexParameters {
    structureHeight: number;
    dimensionD0: number;
    slenderness: number = 0;

    speedV0: number;
    topographicFactorS1: number;
    statisticalFactorS3: number[];
    
    gustFactorFr: number = 0.69;
    elevationZ: number;
    structureCategory: string;
    exponentP: { [key: string]: number};
    meteorologicalParameterBm : { [key: string]: number};
    roughnessFactorS2: number = 0;

    speedVcr : number = 0;

    structureFrequencyFn: number;
    transversalDimensionL: number;
    strouhalNumberSt: { [key: string]: number};

    constructor(structureHeight: number, dimensionD0: number, speedV0: number, topographicFactorS1: number, statisticalFactorS3: number[], elevationZ: number, structureCategory: string, structureFrequencyFn: number, transversalDimensionL: number) {
        this.structureHeight = structureHeight;
        this.dimensionD0 = dimensionD0;
        this.speedV0 = speedV0;
        this.topographicFactorS1 = topographicFactorS1;
        this.statisticalFactorS3 = statisticalFactorS3;
        this.elevationZ = elevationZ;
        this.structureCategory = structureCategory;
        this.structureFrequencyFn = structureFrequencyFn;
        this.transversalDimensionL = transversalDimensionL;

        this.exponentP = {
            "Categoria I": 0.095,
            "Categoria II": 0.15,
            "Categoria III": 0.185,
            "Categoria IV": 0.23,
            "Categoria V": 0.31,
        };

        this.meteorologicalParameterBm = {
            "Categoria I": 1.23,
            "Categoria II": 1,
            "Categoria III": 0.86,
            "Categoria IV": 0.71,
            "Categoria V": 0.50,
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
        this.roughnessFactorS2 = bm * this.gustFactorFr * (this.elevationZ / 10) ^ p;
        return this.roughnessFactorS2;
    };

    calculateSpeedVcr () : number {
        if (this.roughnessFactorS2 === 0) {
            this.calculateFactorS2();
        }
        let comparisonFunction = 1.25 * this.speedV0 * this.topographicFactorS1 * this.roughnessFactorS2 * this.statisticalFactorS3;
        this.speedVcr
    };
};
