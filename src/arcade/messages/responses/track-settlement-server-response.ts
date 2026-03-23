import { AppServerResponse } from '../../../app/types/app-server-response.js';
import type { TrackInfo } from '../../types/track-info.js';

export class TrackSettlementServerResponse extends AppServerResponse {
    static readonly ACTION: string = 'track_settlement';

    readonly errMsg: string;
    readonly errCode: number;
    readonly data: TrackSettlementServerResponseData | undefined;

    constructor(data: TrackSettlementServerResponseData | undefined, errCode: number = 0, errMsg: string = '') {
        super(TrackSettlementServerResponse.ACTION);

        this.errCode = errCode;
        this.errMsg = errMsg;
        if (data) {
            this.data = data;
        }
    }
}

export class TrackSettlementServerResponseData {
    readonly addExp: number;
    readonly trackList: TrackInfo[];

    constructor(addExp: number, trackList: TrackInfo[]) {
        this.addExp = addExp;
        this.trackList = trackList;
    }
}
