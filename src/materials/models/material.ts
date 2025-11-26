export class Material {
    readonly id: string;
    readonly playerId: string;
    readonly name: string;
    readonly type: string;
    amount: number;

    constructor(
        id: string,
        playerId: string,
        name: string,
        type: string,
        amount: number,
    ) {
        this.id = id;
        this.playerId = playerId;
        this.name = name;
        this.type = type;
        this.amount = amount;
    }
}
