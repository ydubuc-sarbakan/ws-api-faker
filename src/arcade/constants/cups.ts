export class Cups {
    static readonly MICKEYS_CUP: Cup = { id: '0' };
    static readonly ANXIETYS_CUP: Cup = { id: '1' };
    static readonly VANELLOPES_CUP: Cup = { id: '2' };
}

export const ALL_CUPS: Cup[] = [...Object.values(Cups)];

export interface Cup {
    id: string;
}
