import {AppClientRequest} from "../../app/types/app-client-response.js";

export class PlayerFinishedRaceClientRequest extends AppClientRequest {
    static readonly ACTION: string = "player-finished-race";

    readonly playerId: string = '';
    readonly position: number = 0;
}
