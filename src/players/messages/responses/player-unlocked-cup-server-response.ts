import { AppServerResponse } from '../../../app/types/app-server-response.js';

export class PlayerUnlockedCupServerResponse extends AppServerResponse {
    static readonly ACTION: string = 'player-unlocked-cup';

    readonly playerId: string;
    readonly cupId: string;

    constructor(playerId: string, cupId: string) {
        super(PlayerUnlockedCupServerResponse.ACTION);
        this.playerId = playerId;
        this.cupId = cupId;
    }
}
