import { AppClientRequest } from '../../../app/types/app-client-response.js';

export class CreatePlayerCheatClientRequest extends AppClientRequest {
    static readonly ACTION: string = 'create-player-cheat';

    readonly name: string = '';
    readonly experience: number = 0;
    readonly level: number = 1;
    readonly unlockedSkins: string[] = [];
    readonly unlockedCups: string[] = [];
}
