export class UpdateCardDto {
    readonly cardId: string = '';
    readonly cardName: string | undefined = undefined;
    readonly cfgId: number | undefined = undefined;
    readonly star: number | undefined = undefined;
    readonly skinList: string[] | undefined = undefined;
    readonly carList: string[] | undefined = undefined;
    readonly status: number | undefined = undefined;
}
