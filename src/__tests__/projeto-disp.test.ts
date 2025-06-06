import { VortexParameters } from "../calculation";

describe("VortexParameters", () => {
    // test("Cálculo de Esbeltez", () => {
    //     const vp = new VortexParameters(
    //     80,             // structureHeight
    //     11,              // dimensionD0
    //     45,             // speedV0
    //     1.0,            // topographicFactorS1
    //     1.0,            // statisticalFactorS3
    //     60,             // elevationZ
    //     "Category IV",  // structureCategory
    //     0.12,           // structureFrequencyFn
    //     13,              // transversalDimensionL
    //     "Rectangle",       // structureForm
    //     "Horizontal",   // windDirection
    //     13,              // widthA
    //     22               // lenghtB
    //     );  
        
    //     const result = vp.calculateSlenderness();

    //     console.log("Esbeltez =", vp.slenderness);
    //     expect(result).toContain("devem ser investigados");
    // });

    // test("Cálculo do fator S2", () => {
    //     const vp = new VortexParameters(
    //     2000,             // structureHeight
    //     13,              // dimensionD0
    //     90,             // speedV0
    //     1.0,            // topographicFactorS1
    //     1.0,            // statisticalFactorS3
    //     80,             // elevationZ
    //     "Category VI",  // structureCategory
    //     0.12,           // structureFrequencyFn
    //     13,              // transversalDimensionL
    //     "Rectangle",       // structureForm
    //     "Horizontal",   // windDirection
    //     13,              // widthA
    //     22               // lenghtB        
    //     );
    
    //     const result = vp.calculateFactorS2();
    //     console.log("bm =", vp.meteorologicalParameterBm);
    //     console.log("p =", vp.exponentP);
    //     console.log("S2 =", vp.roughnessFactorS2);

    //     expect(vp.meteorologicalParameterBm["Category IV"]).toBe(0.71);
    //     expect(vp.exponentP["Category IV"]).toBe(0.23);
    //     expect(result).toBeCloseTo(1.07, 2);
    // });

    test("Cálculo da Vest", () => {
        const vp = new VortexParameters(
        80,             // structureHeight
        13,              // dimensionD0
        450000,             // speedV0
        1.0,            // topographicFactorS1
        1.0,            // statisticalFactorS3
        80,             // elevationZ
        "Category IV",  // structureCategory
        0.12,           // structureFrequencyFn
        13,              // transversalDimensionL
        "Rectangle",       // structureForm
        "Horizontal",   // windDirection
        13,              // widthA
        22               // lenghtB        
        );
    
        //vp.calculateFactorS2();
        const result = vp.calculateStructureSpeed();

        expect(result).toBeCloseTo(44.46, 2);
    });

});
