export class CreatePlayerDto {
    readonly name: string;
    readonly experience: number;
    readonly level: number;
    readonly unlockedSkins: string[];
    readonly unlockedCups: string[];

    constructor(name: string, experience: number, level: number, unlockedSkins: string[], unlockedCups: string[]) {
        this.name = name;
        this.experience = experience;
        this.level = level;
        this.unlockedSkins = unlockedSkins;
        this.unlockedCups = unlockedCups;
    }
}
