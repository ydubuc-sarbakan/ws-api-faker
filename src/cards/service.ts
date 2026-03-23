import { StashManager } from '../app/managers/stash/stash-manager.js';
import { Stash } from '../app/managers/stash/stash.js';
import type { CreateCardDto } from './dtos/create-card-dto.js';
import { GetCardDto } from './dtos/get-card-dto.js';
import type { UpdateCardDto } from './dtos/update-card-dto.js';
import type { Card } from './models/card.js';

export class CardsService {
    private readonly stash: Stash;

    constructor(stash: Stash = StashManager.Instance().getStash('cards')!) {
        this.stash = stash;
    }

    async createCard(dto: CreateCardDto): Promise<Card> {
        const card: Card = {
            ...dto,
        };

        try {
            const _ = await this.stash.put(card, card.cardId, false);
            return card;
        } catch (e) {
            throw new Error(`Failed to create card": ${(e as Error).message}`);
        }
    }

    async getCard(dto: GetCardDto): Promise<Card> {
        const card: Card | undefined = await this.stash.get<Card>(dto.cardId);
        if (!card) {
            throw new Error(`Failed to get card with id "${dto.cardId}"`);
        }

        return card;
    }

    async updateCard(dto: UpdateCardDto): Promise<Card> {
        const card = await this.getCard(new GetCardDto(dto.cardId));

        if (dto.cardName !== undefined) {
            card.cardName = dto.cardName;
        }
        if (dto.cfgId !== undefined) {
            card.cfgId = dto.cfgId;
        }
        if (dto.star !== undefined) {
            card.star = dto.star;
        }
        if (dto.skinList) {
            card.skinList = dto.skinList;
        }
        if (dto.carList) {
            card.carList = dto.carList;
        }
        if (dto.status !== undefined) {
            card.status = dto.status;
        }

        try {
            const _ = await this.stash.put(card, card.cardId, false);
            return card;
        } catch (e) {
            throw new Error(`Failed to update card with id "${dto.cardId}": ${(e as Error).message}`);
        }
    }
}
