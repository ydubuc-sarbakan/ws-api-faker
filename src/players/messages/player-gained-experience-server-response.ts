import {AppServerResponse} from "../../app/types/app-server-response.js";

export class PlayerGainedExperienceServerResponse extends AppServerResponse {
    static readonly ACTION: string = 'player-gained-experience';

    readonly playerId: string;
    readonly experienceGained: number;

    constructor(
        playerId: string,
        experienceGained: number,
    ) {
        super(PlayerGainedExperienceServerResponse.ACTION);
        this.playerId = playerId;
        this.experienceGained = experienceGained;
    }
}
