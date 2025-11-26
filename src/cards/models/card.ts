export class Card {
    readonly id: string;
    name: string;
    racerId: string;
    rarity: string;
    experience: number;
    unlockedSkins: string[];

    constructor(
        id: string,
        name: string,
        racerId: string,
        rarity: string,
        experience: number,
        unlockedSkins: string[],
    ) {
        this.id = id;
        this.name = name;
        this.racerId = racerId;
        this.rarity = rarity;
        this.experience = experience;
        this.unlockedSkins = unlockedSkins;
    }
}
