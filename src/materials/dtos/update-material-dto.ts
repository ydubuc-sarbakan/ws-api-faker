export class UpdateMaterialDto {
    readonly id: string;
    readonly amountToModify: number;

    constructor(id: string, amount: number) {
        this.id = id;
        this.amountToModify = amount;
    }
}
