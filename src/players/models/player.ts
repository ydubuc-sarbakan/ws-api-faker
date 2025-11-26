export class Player {
    readonly id: string;
    name: string;
    experience: number;
    unlockedSkins: string[];
    unlockedCups: string[];

    constructor(
        id: string,
        name: string,
        experience: number,
        unlockedSkins: string[],
        unlockedCups: string[],
    ) {
        this.id = id;
        this.name = name;
        this.experience = experience;
        this.unlockedSkins = unlockedSkins;
        this.unlockedCups = unlockedCups;
    }
}
