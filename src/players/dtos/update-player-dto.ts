import type { TrackInfo } from '../../arcade/types/track-info.js';

export class UpdatePlayerDto {
    readonly roleId: string;
    readonly nickname: string | undefined;
    readonly avatarUrl: string | undefined;
    readonly lv: number | undefined;
    readonly exp: number | undefined;
    readonly trackList: TrackInfo[] | undefined;

    constructor(
        roleId: string,
        nickname: string | undefined = undefined,
        avatarUrl: string | undefined = undefined,
        lv: number | undefined = undefined,
        exp: number | undefined = undefined,
        trackList: TrackInfo[] | undefined = undefined,
    ) {
        this.roleId = roleId;
        this.nickname = nickname;
        this.avatarUrl = avatarUrl;
        this.lv = lv;
        this.exp = exp;
        this.trackList = trackList;
    }
}
