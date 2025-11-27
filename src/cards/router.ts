import { WsRouter } from '../app/core/types/ws-router.js';
import type { AppEnvelope } from '../app/types/app-envelope.js';
import { BuyCardClientRequest } from './messages/requests/buy-card-client-request.js';
import { UpgradeCardClientRequest } from './messages/requests/upgrade-card-client-request.js';
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
                const request = requestEnvelope.openAs(BuyCardClientRequest);
                this.tryHandling(() => this.cardsController.handleBuyCardClientRequest(request, socket));
                return true;
            }
            case UpgradeCardClientRequest.ACTION: {
                const request = requestEnvelope.openAs(UpgradeCardClientRequest);
                this.tryHandling(() => this.cardsController.handleUpgradeCardClientRequest(request, socket));
                return true;
            }
        }

        return false;
    }
}
