export class TrackInfo {
    readonly trackCfgId: number;
    readonly cupName: string;
    readonly trackName: string;
    readonly isLocked: boolean;

    constructor(trackCfgId: number, cupName: string, trackName: string, isLocked: boolean) {
        this.trackCfgId = trackCfgId;
        this.cupName = cupName;
        this.trackName = trackName;
        this.isLocked = isLocked;
    }
}
