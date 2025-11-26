export class CreateMaterialDto {
    readonly playerId: string;
    readonly name: string;
    readonly type: string;
    readonly amount: number;

    constructor(playerId: string, name: string, type: string, amount: number) {
        this.playerId = playerId;
        this.name = name;
        this.type = type;
        this.amount = amount;
    }
}
