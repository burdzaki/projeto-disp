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
