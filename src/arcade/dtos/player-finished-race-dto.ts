export class PlayerFinishedRaceDto {
    readonly playerId: string = '';
    readonly position: number = 0;

    constructor(
        playerId: string,
        position: number,
    ) {
        this.playerId = playerId;
        this.position = position;
    }
}
