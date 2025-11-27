import type { BuyCardClientRequest } from './messages/requests/buy-card-client-request.js';
import { CardsService } from './service.js';
import type { CreateCardDto } from './dtos/create-card-dto.js';
import { UpgradeCardClientRequest } from './messages/requests/upgrade-card-client-request.js';
import type { UpgradeCardDto } from './dtos/upgrade-card-dto.js';
import { CardGenerator } from './utils/card-generator.js';
import type { Card } from './models/card.js';
import { CardCollectedServerResponse } from './messages/responses/card-collected-server-response.js';

export class CardsController {
    private readonly cardsService: CardsService;

    constructor(cardsService: CardsService = new CardsService()) {
        this.cardsService = cardsService;
    }

    async handleBuyCardClientRequest(request: BuyCardClientRequest, socket: WebSocket): Promise<void> {
        const dto: CreateCardDto = CardGenerator.generateCreateCardDto();
        const card: Card = await this.cardsService.createCard(dto);
        const response: CardCollectedServerResponse = new CardCollectedServerResponse(card);
        socket.send(response.serialize());
    }

    async handleUpgradeCardClientRequest(request: UpgradeCardClientRequest, socket: WebSocket): Promise<void> {
        const dto: UpgradeCardDto = {
            id: request.id,
            upgradeMaterialId: request.upgradeMaterialId,
            upgradeMaterialAmount: request.upgradeMaterialAmount,
        };

        await this.cardsService.upgradeCard(dto);
    }
}
