import { WsRouter } from '../app/core/types/ws-router.js';
import type { AppEnvelope } from '../app/types/app-envelope.js';
import { ArcadeController } from './controller.js';
import { TrackSettlementClientRequest } from './messages/requests/track-settlement-client-request.js';

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
            case TrackSettlementClientRequest.ACTION: {
                const request = requestEnvelope.openAs(TrackSettlementClientRequest);
                this.tryHandling(() => this.arcadeController.handleTrackSettlement(request, socket));
                return true;
            }
            default:
                return false;
        }
    }
}
