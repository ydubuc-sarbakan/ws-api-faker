export class Material {
    readonly id: string;
    readonly playerId: string;
    readonly gameDefinitionId: string;
    readonly name: string;
    readonly type: string;
    readonly amount: number;

    constructor(id: string, playerId: string, gameDefinitionId: string, name: string, type: string, amount: number) {
        this.id = id;
        this.playerId = playerId;
        this.gameDefinitionId = gameDefinitionId;
        this.name = name;
        this.type = type;
        this.amount = amount;
    }
}
