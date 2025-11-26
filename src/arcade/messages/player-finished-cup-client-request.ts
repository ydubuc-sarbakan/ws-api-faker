import {AppClientRequest} from "../../app/types/app-client-response.js";

export class PlayerFinishedCupClientRequest extends AppClientRequest {
    static readonly ACTION: string = "player-finished-cup";

    readonly playerId: string = '';
    readonly position: number = 0;
}
