export class CreateMaterialDto {
    readonly playerId: string;
    readonly gameDefinitionId: string;
    readonly name: string;
    readonly type: string;
    readonly amount: number;

    constructor(playerId: string, gameDefinitionId: string, name: string, type: string, amount: number) {
        this.playerId = playerId;
        this.gameDefinitionId = gameDefinitionId;
        this.name = name;
        this.type = type;
        this.amount = amount;
    }
}
