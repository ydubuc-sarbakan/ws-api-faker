import { WsRouter } from '../app/core/types/ws-router.js';
import type { AppEnvelope } from '../app/types/app-envelope.js';
import { PlayerFinishedRaceClientRequest } from './messages/requets/player-finished-race-client-request.js';
import { ArcadeController } from './controller.js';
import { PlayerFinishedCupClientRequest } from './messages/requets/player-finished-cup-client-request.js';

export class ArcadeRouter extends WsRouter<AppEnvelope> {
    private readonly arcadeController: ArcadeController;

    constructor(
        arcadeController: ArcadeController = new ArcadeController(),
        subRouters: WsRouter<AppEnvelope>[] = [
            // you can add sub-routers here
        ],
    ) {
        super(subRouters);
        this.arcadeController = arcadeController;
    }

    handled(requestEnvelope: AppEnvelope, socket: WebSocket): boolean {
        switch (requestEnvelope.action) {
            case PlayerFinishedRaceClientRequest.ACTION: {
                const request = requestEnvelope.openAs(PlayerFinishedRaceClientRequest);
                this.tryHandling(() => this.arcadeController.handlePlayerFinishedRaceClientRequest(request, socket));
                return true;
            }
            case PlayerFinishedCupClientRequest.ACTION: {
                const request = requestEnvelope.openAs(PlayerFinishedCupClientRequest);
                this.tryHandling(() => this.arcadeController.handlePlayerFinishedCupClientRequest(request, socket));
                return true;
            }
            default:
                return false;
        }
    }
}
