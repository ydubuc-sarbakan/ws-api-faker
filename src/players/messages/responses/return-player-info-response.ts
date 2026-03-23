import { AppServerResponse } from '../../../app/types/app-server-response.js';
import type { TrackInfo } from '../../../arcade/types/track-info.js';

export class ReturnPlayerInfoServerResponse extends AppServerResponse {
    static readonly ACTION: string = 'return_player_info';

    readonly playerInfo: ReturnPlayerInfoServerResponseData;

    constructor(playerInfo: ReturnPlayerInfoServerResponseData) {
        super(ReturnPlayerInfoServerResponse.ACTION);

        this.playerInfo = playerInfo;
    }
}

export class ReturnPlayerInfoServerResponseData {
    readonly roleId: string;
    readonly nickname: string;
    readonly avatarUrl: string;
    readonly lv: number;
    readonly exp: number;
    readonly trackList: TrackInfo[];

    constructor(roleId: string, nickname: string, avatarUrl: string, lv: number, exp: number, trackList: TrackInfo[]) {
        this.roleId = roleId;
        this.nickname = nickname;
        this.avatarUrl = avatarUrl;
        this.lv = lv;
        this.exp = exp;
        this.trackList = trackList;
    }
}
