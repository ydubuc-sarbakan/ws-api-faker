import type { CreateCardDto } from './dtos/create-card-dto.js';
import { UpdateCardDto } from './dtos/update-card-dto.js';
import { ActivateCardClientRequest } from './messages/requests/activate-card-client-request.js';
import type { CheckCardClientRequest } from './messages/requests/check-card-client-request.js';
import type { InsertCardClientRequest } from './messages/requests/insert-card-client-request.js';
import { CheckCardServerResponse } from './messages/responses/check-card-server-response.js';
import { InsertCardServerResponse } from './messages/responses/insert-card-server-response.js';
import type { Card } from './models/card.js';
import { CardsService } from './service.js';

export class CardsController {
    private readonly cardsService: CardsService;

    constructor(cardsService: CardsService = new CardsService()) {
        this.cardsService = cardsService;
    }

    async handleActivateCard(request: ActivateCardClientRequest, socket: WebSocket): Promise<void> {
        const updateCardDto: UpdateCardDto = {
            cardId: request.cardId,
            status: 1,
            cardName: undefined,
            cfgId: undefined,
            star: undefined,
            skinList: undefined,
            carList: undefined,
        };

        await this.cardsService.updateCard(updateCardDto);
    }

    async handleCheckCard(request: CheckCardClientRequest, socket: WebSocket): Promise<void> {
        const card = await this.cardsService.getCard({ cardId: request.cardId });
        const response = new CheckCardServerResponse(card);
        socket.send(response.serialize());
    }

    async handleInsertCard(request: InsertCardClientRequest, socket: WebSocket): Promise<void> {
        let card: Card;

        try {
            card = await this.cardsService.getCard({ cardId: request.cardId });
        } catch (e) {
            const createCardDto: CreateCardDto = {
                cardId: request.cardId,
                cardName: "Don't know where they get the card name from",
                cfgId: 42,
                star: 1,
                skinList: [],
                carList: [],
                status: 0,
            };

            card = await this.cardsService.createCard(createCardDto);
        }

        const response = new InsertCardServerResponse(card);
        socket.send(response.serialize());
    }
}
