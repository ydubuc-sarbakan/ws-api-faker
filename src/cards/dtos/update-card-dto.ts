export class UpdateCardDto {
    readonly id: string = '';
    readonly name: string | undefined = undefined;
    readonly racerId: string | undefined = undefined;
    readonly rarity: string | undefined = undefined;
    readonly experience: number | undefined = undefined;
    readonly levelsToAdd: number | undefined = undefined;
    readonly unlockedSkinsToAdd: string[] | undefined = undefined;
}
