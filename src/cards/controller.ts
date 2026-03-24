import { CreateCardDto } from './dtos/create-card-dto.js';
import { UpdateCardDto } from './dtos/update-card-dto.js';
import { ActivateCardClientRequest } from './messages/requests/activate-card-client-request.js';
import type { CheckCardClientRequest } from './messages/requests/check-card-client-request.js';
import type { InsertCardClientRequest } from './messages/requests/insert-card-client-request.js';
import { ActivateCardServerResponse } from './messages/responses/activate-card-server-response.js';
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
        try {
            const card = await this.cardsService.getCard({ cardId: request.cardId });
            if (card.status === 1) {
                const response = new ActivateCardServerResponse(card);
                socket.send(response.serialize());
                return;
            }
        } catch (e) {
            const dto = new CreateCardDto(request.cardId, 'Unknown Card', 295, 1, [], [], 0);
            await this.cardsService.createCard(dto);
        }

        const updateCardDto: UpdateCardDto = {
            cardId: request.cardId,
            cardName: undefined,
            cfgId: undefined,
            star: undefined,
            skinList: undefined,
            carList: undefined,
            status: 1,
        };

        const card = await this.cardsService.updateCard(updateCardDto);

        const response = new ActivateCardServerResponse(card);
        socket.send(response.serialize());
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
