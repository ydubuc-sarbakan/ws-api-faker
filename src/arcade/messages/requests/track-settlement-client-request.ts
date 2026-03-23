import { AppClientRequest } from '../../../app/types/app-client-response.js';

export class TrackSettlementClientRequest extends AppClientRequest {
    static readonly ACTION: string = 'track_settlement';

    readonly trackCfgId: number = 0;
    readonly rank: number = 0;
    readonly roleId: string = '';
}
