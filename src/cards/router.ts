import { WsRouter } from '../app/core/types/ws-router.js';
import type { AppEnvelope } from '../app/types/app-envelope.js';
import { BuyCardClientRequest } from './messages/buy-card-client-request.js';
import { UpgradeCardClientRequest } from './messages/upgrade-card-client-request.js';
import { CardsController } from './controller.js';

export class CardsRouter extends WsRouter<AppEnvelope> {
    private readonly cardsController: CardsController;

    constructor(
        cardsController: CardsController = new CardsController(),
        subRouters: WsRouter<AppEnvelope>[] = [
            // you can add sub-routers here
        ],
    ) {
        super(subRouters);
        this.cardsController = cardsController;
    }

    handled(requestEnvelope: AppEnvelope, socket: WebSocket): boolean {
        switch (requestEnvelope.action) {
            case BuyCardClientRequest.ACTION: {
                this.cardsController.handleBuyCardClientRequest(requestEnvelope.openAs(BuyCardClientRequest), socket);
                return true;
            }
            case UpgradeCardClientRequest.ACTION: {
                this.cardsController.handleUpgradeCardClientRequest(
                    requestEnvelope.openAs(UpgradeCardClientRequest),
                    socket,
                );
                return true;
            }
            default:
                return false;
        }
    }
}
