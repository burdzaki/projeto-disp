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
    statisticalFactorS3: number;
    
    gustFactorFr: number = 0.69;
    elevationZ: number;
    structureCategory: string;
    exponentP: { [key: string]: number};
    meteorologicalParameterBm : { [key: string]: number};
    roughnessFactorS2: number = 0;

    structureSpeed: number = 0;
    speedVcr: number = 0;

    structureFrequencyFn: number;
    transversalDimensionL: number;
    strouhalNumberSt: { [strucutureForm: string]: { [windDirection: string]:  { [structureRatio: number]:  number}}};

    constructor(structureHeight: number, dimensionD0: number, speedV0: number, topographicFactorS1: number, statisticalFactorS3: number, elevationZ: number, structureCategory: string, structureFrequencyFn: number, transversalDimensionL: number) {
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

        this.strouhalNumberSt = {
            "Circle": {
                "Any": {
                    1: 0.20,
                },
            },
            "Plate": {
                "Horizontal": {
                    1: 0.16,
                },
                "Vertical": {
                    1: 0.15,
                },
            },
            "Rectangle": {
                "Horizontal": {
                    1: 0.16,
                    1: 0.16,
                },
            },
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

    calculateStructureSpeed () : number {
        if (this.roughnessFactorS2 === 0) {
            this.calculateFactorS2();
        }
        this.structureSpeed = 1.25 * this.speedV0 * this.topographicFactorS1 * this.roughnessFactorS2 * this.statisticalFactorS3;
        return this.structureSpeed;
    };

    calculateStrouhalNumber () : number;
    
    }
};
