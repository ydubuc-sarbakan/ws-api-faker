export class GetCardDto {
    readonly cardId: string = '';

    constructor(cardId: string) {
        this.cardId = cardId;
    }
}
