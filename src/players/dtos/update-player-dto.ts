export class UpdatePlayerDto {
    readonly id: string;
    readonly name: string | undefined;
    readonly experience: number | undefined;
    readonly levelsToAdd: number | undefined;
    readonly unlockedSkinsToAdd: string[] | undefined;
    readonly unlockedCupsToAdd: string[] | undefined;

    constructor(
        id: string,
        name: string | undefined = undefined,
        experience: number | undefined = undefined,
        levelsToAdd: number | undefined = undefined,
        unlockedSkinsToAdd: string[] | undefined = undefined,
        unlockedCupsToAdd: string[] | undefined = undefined,
    ) {
        this.id = id;
        this.name = name;
        this.experience = experience;
        this.levelsToAdd = levelsToAdd;
        this.unlockedSkinsToAdd = unlockedSkinsToAdd;
        this.unlockedCupsToAdd = unlockedCupsToAdd;
    }
}
