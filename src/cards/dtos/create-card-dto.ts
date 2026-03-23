export class CreateCardDto {
    readonly cardId: string;
    readonly cardName: string;
    readonly cfgId: number;
    readonly star: number;
    readonly skinList: string[];
    readonly carList: string[];
    readonly status: number;

    constructor(
        cardId: string,
        cardName: string,
        cfgId: number,
        star: number,
        skinList: string[],
        carList: string[],
        status: number,
    ) {
        this.cardId = cardId;
        this.cardName = cardName;
        this.cfgId = cfgId;
        this.star = star;
        this.skinList = skinList;
        this.carList = carList;
        this.status = status;
    }
}
