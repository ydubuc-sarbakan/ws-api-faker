export class CreatePlayerDto {
    readonly name: string;
    readonly experience: number;
    readonly unlockedSkins: string[];
    readonly unlockedCups: string[];

    constructor(
        name: string,
        experience: number,
        unlockedSkins: string[],
        unlockedCups: string[],
    ) {
        this.name = name;
        this.experience = experience;
        this.unlockedSkins = unlockedSkins;
        this.unlockedCups = unlockedCups;
    }
}
