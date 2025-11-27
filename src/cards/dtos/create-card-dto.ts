export class CreateCardDto {
    name: string;
    racerId: string;
    rarity: string;
    experience: number;
    level: number;
    unlockedSkins: string[];

    constructor(
        name: string,
        racerId: string,
        rarity: string,
        experience: number,
        level: number,
        unlockedSkins: string[],
    ) {
        this.name = name;
        this.racerId = racerId;
        this.rarity = rarity;
        this.experience = experience;
        this.level = level;
        this.unlockedSkins = unlockedSkins;
    }
}
