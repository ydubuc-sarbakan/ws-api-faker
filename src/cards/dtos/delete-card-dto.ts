export class DeleteCardDto {
    readonly cardId: string = '';

    constructor(cardId: string) {
        this.cardId = cardId;
    }
}
