import { VortexParameters } from "../calculation";

describe("VortexParameters", () => {
    test("calcula esbeltez corretamente", () => {
        const vp = new VortexParameters(
        12, // height
        2,  // D0
        30, 1.0, 1.0, 15, "Category II", 0.69, 2, "Circle", "Horizontal", 1, 2
        );

        const result = vp.calculateSlenderness();
        expect(result).toContain("devem ser investigados");
    });

    test("calcula expoentP e parameterBM corretamente", () => {
        const vpS2 = new VortexParameters (
        60,
        5,
        30,
        1.0,
        1.0,
        60,
        "Category II", 0.69, 2, "Circle", "Horizontal", 1, 2
        );

        const resultS2 = vpS2.calculateFactorS2();
        expect(resultS2).toBeCloseTo(0.90,2);
    });
});
