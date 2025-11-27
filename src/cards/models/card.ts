export class Card {
    readonly id: string;
    readonly name: string;
    readonly racerId: string;
    readonly rarity: string;
    readonly experience: number;
    readonly level: number;
    readonly unlockedSkins: string[];

    constructor(
        id: string,
        name: string,
        racerId: string,
        rarity: string,
        experience: number,
        level: number,
        unlockedSkins: string[],
    ) {
        this.id = id;
        this.name = name;
        this.racerId = racerId;
        this.rarity = rarity;
        this.experience = experience;
        this.level = level;
        this.unlockedSkins = unlockedSkins;
    }
}
