import { calculateST } from "../utils/strouhalCalculation";

describe("calculateST", () => {
    //Circle
    test("Circle retorna 0.20", () => {
        expect(calculateST("Circle", "Horizontal", 10, 20)).toBe(0.20);
    });


    //Plate
    test("Plate com vento Horizontal retorna 0.16", () => {
        expect(calculateST("Plate", "Horizontal", 10, 20)).toBe(0.16);
    });

    test("Plate com vento Vertical retorna 0.15", () => {
        expect(calculateST("Plate", "Vertical", 10, 20)).toBe(0.15);
    });


    //Rectangle
    test("Rectangle com razão < 1 retorna 0.12", () => {
        expect(calculateST("Rectangle", "Horizontal", 20, 10)).toBeCloseTo(0.12);
    });

    test("Rectangle com razão 1.5 retorna 0.09", () => {
        expect(calculateST("Rectangle", "Horizontal", 10, 15)).toBeCloseTo(0.09);
    });

    test("Rectangle com razão 2.5 retorna 0.06", () => {
        expect(calculateST("Rectangle", "Horizontal", 12, 30)).toBeCloseTo(0.06);
    });

    test("Rectangle com razão 3.25 retorna 0.105", () => {
        expect(calculateST("Rectangle", "Horizontal", 10, 32.5)).toBeCloseTo(0.105);
    });

    test("Rectangle com razão 3.5 retorna 0.15", () => {
        expect(calculateST("Rectangle", "Horizontal", 10, 35)).toBeCloseTo(0.15);
    });

    test("Rectangle com razão 4.25 retorna 0.13", () => {
        expect(calculateST("Rectangle", "Horizontal", 10, 42.5)).toBeCloseTo(0.13);
    });

    test("Rectangle com razão 5 retorna 0.11", () => {
        expect(calculateST("Rectangle", "Horizontal", 10, 50)).toBeCloseTo(0.11);
    });

    test("Rectangle com razão > 10 retorna 0.09", () => {
        expect(calculateST("Rectangle", "Horizontal", 10, 120)).toBeCloseTo(0.09);
    });


    //HFormat
    test("HFormat com vento Vertical retorna 0.14", () => {
        expect(calculateST("HFormat", "Vertical", 10, 20)).toBe(0.14);
    });

    test("HFormat com vento Horizontal com razão < 1 retorna 0.12", () => {
        expect(calculateST("HFormat", "Horizontal", 20, 10)).toBeCloseTo(0.12);
    });
    
    test("HFormat com vento Horizontal com razão 1.25 retorna 0.115", () => {
        expect(calculateST("HFormat", "Horizontal", 10, 12.5)).toBeCloseTo(0.115);
    });

    test("HFormat com vento Horizontal com razão 1.75 retorna 0.125", () => {
        expect(calculateST("HFormat", "Horizontal", 10, 17.5)).toBeCloseTo(0.125);
    });

    test("HFormat com vento Horizontal com razão > 2 retorna 0.14", () => {
        expect(calculateST("HFormat", "Horizontal", 10, 30)).toBeCloseTo(0.14);
    });


    //UFormat
    test("UFormat retorna 0.14", () => {
        expect(calculateST("UFormat", "Horizontal", 10, 20)).toBe(0.14);
    });


    //TFormat
    test("TFormat com razão < 0.5 retorna 0.15", () => {
        expect(calculateST("TFormat", "Horizontal", 22, 10)).toBe(0.15);
    });

    test("TFormat com razão 0.75 retorna 0.14", () => {
        expect(calculateST("TFormat", "Horizontal", 20, 15)).toBeCloseTo(0.14);
    });

    test("TFormat com razão 1.5 retorna 0.105", () => {
        expect(calculateST("TFormat", "Horizontal", 20, 30)).toBeCloseTo(0.105);
    });

    test("TFormat com razão > 2 retorna 0.08", () => {
        expect(calculateST("TFormat", "Horizontal", 17, 40)).toBe(0.08);
    });


    //LFormat
    test("LFormat retorna 0.13", () => {
        expect(calculateST("LFormat", "Horizontal", 10, 20)).toBe(0.13);
    });


    //Invalid
    test("Forma inválida retorna 0", () => {
        expect(calculateST("Invalid", "Horizontal", 10, 20)).toBe(0);
    });
});