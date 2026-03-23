import type { TrackInfo } from '../../arcade/types/track-info.js';

export class Player {
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
