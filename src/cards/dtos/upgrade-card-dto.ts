export class UpgradeCardDto {
    readonly id: string = '';
    readonly upgradeMaterialId: string = '';
    readonly upgradeMaterialAmount: number = 0;

    constructor(id: string, upgradeMaterialId: string, upgradeMaterialAmount: number) {
        this.id = id;
        this.upgradeMaterialId = upgradeMaterialId;
        this.upgradeMaterialAmount = upgradeMaterialAmount;
    }
}
