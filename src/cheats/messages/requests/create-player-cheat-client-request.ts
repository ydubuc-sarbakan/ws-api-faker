import { AppClientRequest } from '../../../app/types/app-client-response.js';
import type { TrackInfo } from '../../../arcade/types/track-info.js';

export class CreatePlayerCheatClientRequest extends AppClientRequest {
    static readonly ACTION: string = 'create-player-cheat';

    readonly nickname: string = '';
    readonly avatarUrl: string = '';
    readonly lv: number = 1;
    readonly exp: number = 0;
    readonly trackList: TrackInfo[] = [];
}
