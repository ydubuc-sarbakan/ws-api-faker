import { WsRouter } from '../app/core/types/ws-router.js';
import type { AppEnvelope } from '../app/types/app-envelope.js';
import { CardsController } from './controller.js';
import { ActivateCardClientRequest } from './messages/requests/activate-card-client-request.js';
import { CheckCardClientRequest } from './messages/requests/check-card-client-request.js';
import { InsertCardClientRequest } from './messages/requests/insert-card-client-request.js';

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
            case ActivateCardClientRequest.ACTION: {
                const request = requestEnvelope.openAs(ActivateCardClientRequest);
                this.cardsController.handleActivateCard(request, socket);
                return true;
            }
            case CheckCardClientRequest.ACTION: {
                const request = requestEnvelope.openAs(CheckCardClientRequest);
                this.cardsController.handleCheckCard(request, socket);
                return true;
            }
            case InsertCardClientRequest.ACTION: {
                const request = requestEnvelope.openAs(InsertCardClientRequest);
                this.cardsController.handleInsertCard(request, socket);
                return true;
            }
        }

        return false;
    }
}
