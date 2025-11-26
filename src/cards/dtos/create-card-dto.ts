export class CreateCardDto {
    name: string;
    racerId: string;
    rarity: string;
    experience: number;
    unlockedSkins: string[];

    constructor(name: string, racerId: string, rarity: string, experience: number, unlockedSkins: string[]) {
        this.name = name;
        this.racerId = racerId;
        this.rarity = rarity;
        this.experience = experience;
        this.unlockedSkins = unlockedSkins;
    }
}
