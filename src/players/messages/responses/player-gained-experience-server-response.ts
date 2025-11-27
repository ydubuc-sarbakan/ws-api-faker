import { AppServerResponse } from '../../../app/types/app-server-response.js';

export class PlayerGainedExperienceServerResponse extends AppServerResponse {
    static readonly ACTION: string = 'player-gained-experience';

    readonly playerId: string;
    readonly experienceGained: number;
    readonly previousLevel: number;
    readonly currentLevel: number;
    readonly previousExperience: number;
    readonly currentExperience: number;
    readonly previousExperienceRequired: number;
    readonly currentExperienceRequired: number;

    constructor(
        playerId: string,
        experienceGained: number,
        previousLevel: number,
        currentLevel: number,
        previousExperience: number,
        currentExperience: number,
        previousExperienceRequired: number,
        currentExperienceRequired: number,
    ) {
        super(PlayerGainedExperienceServerResponse.ACTION);
        this.playerId = playerId;
        this.experienceGained = experienceGained;
        this.previousLevel = previousLevel;
        this.currentLevel = currentLevel;
        this.previousExperience = previousExperience;
        this.currentExperience = currentExperience;
        this.previousExperienceRequired = previousExperienceRequired;
        this.currentExperienceRequired = currentExperienceRequired;
    }
}
