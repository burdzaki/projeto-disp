import { VortexParameters } from "../calculation";
import { calculateSlenderness } from "../calculation";


test("RF01, RF02: Cálculo de Esbeltez", () => {
    const height: number = 7000.75; 
    const d0: number = 962.60; 
    const result = calculateSlenderness(height, d0);

    console.log("Esbeltez =", result);

    expect(result).toBeCloseTo(7.27, 2);
});

test("RF01, RF02: Cálculo de Esbeltez inválida", () => {
    const height: number = 0; 
    const d0: number = 0; 
    const result = calculateSlenderness(height, d0);

    console.log("Esbeltez =", result);

    expect(result).toBeCloseTo(0);
});

describe("VortexParameters", () => {
    test("RF06: Cálculo do fator S2", () => {
        const vp = new VortexParameters(
        45,             // speedV0
        1.0,            // topographicFactorS1
        1.0,            // statisticalFactorS3
        97.48,          // elevationZ
        "I",            // structureCategory
        0.12,           // structureFrequencyFn
        13,             // transversalDimensionL
        "Rectangle",    // structureForm
        "Horizontal",   // windDirection
        13,             // widthA
        22,             // lenghtB
        true,           //strouhalmode
        0.20            //strouhalmodeInput  
        );
    
        const result = vp.calculateFactorS2();
        console.log("bm =", vp.meteorologicalParameterBm);
        console.log("p =", vp.exponentP);
        console.log("S2 =", vp.roughnessFactorS2);

        expect(vp.meteorologicalParameterBm["I"]).toBe(1.23);
        expect(vp.exponentP["I"]).toBe(0.095);
        expect(vp.roughnessFactorS2).toBeCloseTo(1.05, 2);
        expect(result.bm).toBe(1.23);
        expect(result.p).toBe(0.095);
        expect(result.s2).toBeCloseTo(1.05, 2);

    });

    test("RF07: Cálculo da Vest", () => {
        const vp = new VortexParameters(
        52,             // speedV0
        1.06,           // topographicFactorS1
        1.11,           // statisticalFactorS3
        97.48,          // elevationZ
        "I",            // structureCategory
        0.12,           // structureFrequencyFn
        13,             // transversalDimensionL
        "Rectangle",    // structureForm
        "Horizontal",   // windDirection
        13,             // widthA
        22,             // lenghtB
        true,           //strouhalmode
        0.20            //strouhalmodeInput  
        );
    
        //vp.calculateFactorS2();
        const result = vp.calculateStructureSpeed();

        expect(result).toBeCloseTo(80.58, 2);
    });

    test("RF08: Número de Strouhal manual (false mode)", () => {
    const vp = new VortexParameters(
        45, 1.0, 1.0, 80, "IV",
        0.12, 13,
        "Rectangle", "Horizontal", 13, 22,
        false, // modo manual
        0.18   // valor inserido
    );

        const result = vp.calculateStrouhalNumber();
        console.log("St manual =", result);
        expect(result).toBeCloseTo(0.18, 2);
    });

    test("RF08: Número de Strouhal automático (true mode)", () => {
        const vp = new VortexParameters(
            45, 1.0, 1.0, 80, "IV",
            0.12, 13,
            "Rectangle", "Horizontal", 13, 22,
            true, // modo automático
            0     // ignorado
        );

        const result = vp.calculateStrouhalNumber();
        console.log("St automático =", result);

        // Ajustar valor esperado com base no retorno real do seu calculateST()
        expect(result).toBeGreaterThan(0);
    });

    test("RF08: Número de Strouhal inválido (undefined mode)", () => {
        const vp = new VortexParameters(
            45, 1.0, 1.0, 80, "IV",
            0.12, 13,
            "Rectangle", "Horizontal", 13, 22,
            null as any, // modo inválido
            0.2
        );

        const result = vp.calculateStrouhalNumber();
        console.log("St inválido =", result);
        expect(result).toBe(-1);
    });


    test("RF09: Cálculo da velocidade crítica Vcr", () => {
        const vp = new VortexParameters(
            52,             // speedV0
            1.06,           // topographicFactorS1
            1.11,           // statisticalFactorS3
            97.48,          // elevationZ
            "I",            // structureCategory
            0.581,          // structureFrequencyFn
            14.576,         // transversalDimensionL
            "Rectangle",    // structureForm
            "Horizontal",   // windDirection
            13,             // widthA
            22,             // lenghtB
            false,          //strouhalmode
            0.20            //strouhalmodeInput  
        );

        const result = vp.calculateVcrSpeed();
        console.log("frequency =", vp.structureFrequencyFn);
        console.log("L =", vp.transversalDimensionL);
        console.log("St =", vp.strouhalNumberSt);
        expect(result).toBeCloseTo(42.34, 2); // 0.2 * 13 / 0.2 = 13
    });

    test("RF10: Verificação de dispensa: Vcr > Vest", () => {
        const vp = new VortexParameters(
            10,             // V0 - velocidade baixa proposital
            1.0,            // S1
            1.0,            // S3
            80,             // z
            "IV",           // categoria
            0.5,            // fn
            13,             // L
            "Rectangle",    // forma
            "Horizontal",   // direção
            13,
            22,
            false,          // strouhal modo manual
            0.2             // St
        );

        vp.calculateFactorS2();
        vp.calculateStructureSpeed();
        vp.calculateVcrSpeed();

        const result = vp.calculateVortexSheddingCriteria();
        console.log("Vcr =", vp.VcrSpeed, "| Vest =", vp.structureSpeed);

        expect(result).toBe(true); // Vcr > Vest, então deve ser dispensada
    });

        test("RF10: Verificação de dispensa: Vcr > Vest", () => {
        const vp = new VortexParameters(
            80,             // V0 - velocidade alta proposital
            1.0,            // S1
            1.0,            // S3
            80,             // z
            "IV",           // categoria
            0.5,            // fn
            13,             // L
            "Rectangle",    // forma
            "Horizontal",   // direção
            13,
            22,
            false,          // strouhal modo manual
            0.2             // St
        );

        vp.calculateFactorS2();
        vp.calculateStructureSpeed();
        vp.calculateVcrSpeed();

        const result = vp.calculateVortexSheddingCriteria();
        console.log("Vcr =", vp.VcrSpeed, "| Vest =", vp.structureSpeed);

        expect(result).toBe(false); // Vcr > Vest, então deve ser dispensada
    });

});
