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

    calculateStrouhalNumber () : number {
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
            //write function here
            return this.strouhalNumberSt = 0;
        }
        else if (this.structureForm === "H Form") {
            if (this.windDirection === "Horizontal") {
                switch (this.lenghtB / this.widthA) {
                    case 1.0:
                        return this.strouhalNumberSt = 0.12;
                    case 1.5:
                        return this.strouhalNumberSt = 0.11; 
                    case 2.0:
                        return this.strouhalNumberSt = 0.14;        
                    default:
                        return 0;
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
            switch (this.lenghtB / this.widthA) {
                case 0.5:
                        return this.strouhalNumberSt = 0.15;
                case 1.0:
                        return this.strouhalNumberSt = 0.13;
                case 2.0:
                        return this.strouhalNumberSt = 0.08;
                default:
                    return 0;
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
        let criteria : boolean;
        if (this.VcrSpeed > this.structureSpeed) {
            return criteria = true;
        }
        else return criteria = false;
    }
};
