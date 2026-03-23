export class Card {
    readonly cardId: string;
    cardName: string;
    cfgId: number;
    star: number;
    skinList: string[];
    carList: string[];
    status: number;

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
