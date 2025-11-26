export class Player {
    readonly id: string;
    readonly name: string;
    readonly experience: number;
    readonly level: number;
    readonly unlockedSkins: string[];
    readonly unlockedCups: string[];

    constructor(
        id: string,
        name: string,
        experience: number,
        level: number,
        unlockedSkins: string[],
        unlockedCups: string[],
    ) {
        this.id = id;
        this.name = name;
        this.experience = experience;
        this.level = level;
        this.unlockedSkins = unlockedSkins;
        this.unlockedCups = unlockedCups;
    }
}
