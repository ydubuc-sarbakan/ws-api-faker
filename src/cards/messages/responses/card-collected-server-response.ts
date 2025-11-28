import { AppServerResponse } from '../../../app/types/app-server-response.js';
import type { Card } from '../../models/card.js';

export class CardCollectedServerResponse extends AppServerResponse {
    static readonly ACTION: string = 'card-collected';

    readonly id: string;
    readonly name: string;
    readonly racerId: string;
    readonly rarity: string;
    readonly experience: number;
    readonly unlockedSkins: string[];
    readonly source: string;

    constructor(card: Card, source: string) {
        super(CardCollectedServerResponse.ACTION);
        this.id = card.id;
        this.name = card.name;
        this.racerId = card.racerId;
        this.rarity = card.rarity;
        this.experience = card.experience;
        this.unlockedSkins = card.unlockedSkins;
        this.source = source;
    }
}
