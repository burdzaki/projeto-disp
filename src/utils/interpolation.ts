export function interpolateNumbers (x: number, x1: number, x2: number, y1: number, y2: number) : number {
    let y : number = 0;
    y = y1 + (((x-x1) / (x2-x1)) * (y2 - y1));
    return y;
}
