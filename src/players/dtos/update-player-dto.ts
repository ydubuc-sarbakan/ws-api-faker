export class UpdatePlayerDto {
    readonly id: string;
    readonly name: string | undefined;
    readonly experienceToAdd: number | undefined;
    readonly unlockedSkinsToAdd: string[] | undefined;
    readonly unlockedCupsToAdd: string[] | undefined;

    constructor(
        id: string,
        name: string | undefined = undefined,
        experienceToAdd: number | undefined = undefined,
        unlockedSkinsToAdd: string[] | undefined = undefined,
        unlockedCupsToAdd: string[] | undefined = undefined,
    ) {
        this.id = id;
        this.name = name;
        this.experienceToAdd = experienceToAdd;
        this.unlockedSkinsToAdd = unlockedSkinsToAdd;
        this.unlockedCupsToAdd = unlockedCupsToAdd;
    }
}
