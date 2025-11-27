import { AppServerResponse } from '../../../app/types/app-server-response.js';
import type { Player } from '../../models/player.js';

export class GetPlayerServerResponse extends AppServerResponse {
    static readonly ACTION: string = 'get-player';

    readonly id: string;
    readonly name: string;
    readonly experience: number;
    readonly level: number;
    readonly unlockedSkins: string[];
    readonly unlockedCups: string[];

    constructor(player: Player) {
        super(GetPlayerServerResponse.ACTION);
        this.id = player.id;
        this.name = player.name;
        this.experience = player.experience;
        this.level = player.level;
        this.unlockedSkins = player.unlockedSkins;
        this.unlockedCups = player.unlockedCups;
    }
}
