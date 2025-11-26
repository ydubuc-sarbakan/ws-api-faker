import type {CreateCardDto} from "./dtos/create-card-dto.js";
import type {Card} from "./models/card.js";
import {Stash} from "../app/managers/stash/stash.js";
import type {GetCardDto} from "./dtos/get-card-dto.js";
import type {UpdateCardDto} from "./dtos/update-card-dto.js";
import type {DeleteCardDto} from "./dtos/delete-card-dto.js";
import type {UpgradeCardDto} from "./dtos/upgrade-card-dto.js";
import {MaterialsService} from "../materials/service.js";
import type {Material} from "../materials/models/material.js";

export class CardsService {
    private readonly stash: Stash;
    private readonly materialsService: MaterialsService;

    constructor(
        stash: Stash = new Stash("cards"),
        materialsService: MaterialsService = new MaterialsService(),
    ) {
        this.stash = stash;
        this.materialsService = materialsService;
    }

    async createCard(dto: CreateCardDto) : Promise<Card> {
        const card: Card = {
            id: crypto.randomUUID(),
            ...dto
        };

        try {
            const _ = await this.stash.put(card, card.id, false);
            return card;
        } catch (e) {
            throw new Error(`Failed to create card": ${(e as Error).message}`);
        }
    }

    async getCard(dto: GetCardDto) : Promise<Card> {
        const card: Card | undefined = await this.stash.get<Card>(dto.id)
        if (!card) {
            throw new Error(`Failed to get card with id "${dto.id}"`);
        }

        return card;
    }

    async upgradeCard(dto: UpgradeCardDto) : Promise<Card> {
        const card: Card = await this.getCard({ id: dto.id });
        const material: Material = await this.materialsService.getMaterial({ id: dto.upgradeMaterialId });

        if (material.amount - dto.upgradeMaterialAmount < 0) {
            throw new Error(`Failed to upgrade card with id "${dto.id}": not enough materials`);
        }

        const updateCardDto: UpdateCardDto = {
            id: card.id,
            name: undefined,
            racerId: undefined,
            rarity: undefined,
            experienceToAdd: 100,
            unlockedSkinsToAdd: undefined,
        };

        material.amount = material.amount - dto.upgradeMaterialAmount;
        if (material.amount > 0) {
            await this.materialsService.updateMaterial({ id: material.id, amountToModify: -dto.upgradeMaterialAmount });
        } else {
            await this.materialsService.deleteMaterial({ id: material.id });
        }
        return this.updateCard(updateCardDto);
    }

    private async updateCard(dto: UpdateCardDto) : Promise<Card> {
        const card: Card = await this.getCard({ id: dto.id });

        if (dto.name) card.name = dto.name;
        if (dto.racerId) card.racerId = dto.racerId;
        if (dto.rarity) card.rarity = dto.rarity;
        if (dto.experienceToAdd) card.experience += dto.experienceToAdd;
        if (dto.unlockedSkinsToAdd) card.unlockedSkins.push(...dto.unlockedSkinsToAdd);

        try {
            const _ = await this.stash.put(card, card.id, true);
            return card;
        } catch (e) {
            throw new Error(`Failed to update card with id "${dto.id}": ${(e as Error).message}`);
        }
    }

    async deleteCard(dto: DeleteCardDto) : Promise<void | Error> {
        try {
            await this.stash.delete(dto.id);
        } catch (e) {
            throw new Error(`Failed to delete card with id "${dto.id}": ${(e as Error).message}`);
        }
    }
}
