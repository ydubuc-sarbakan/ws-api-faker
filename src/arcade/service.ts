import type { AppServerResponse } from '../app/types/app-server-response.js';
import { UpdatePlayerDto } from '../players/dtos/update-player-dto.js';
import { PlayersService } from '../players/service.js';
import { TrackSettlementClientRequest } from './messages/requests/track-settlement-client-request.js';
import {
    TrackSettlementServerResponse,
    TrackSettlementServerResponseData,
} from './messages/responses/track-settlement-server-response.js';
import { TrackInfo } from './types/track-info.js';

export class ArcadeService {
    private readonly playersService: PlayersService;

    constructor(playersService: PlayersService = new PlayersService()) {
        this.playersService = playersService;
    }

    async handleTrackSettlement(request: TrackSettlementClientRequest): Promise<AppServerResponse> {
        const player = await this.playersService.getPlayer({ roleId: request.roleId });

        const addExp = 50;
        let unlockableTracks = [
            new TrackInfo(2, 'Mickey', 'Mickey', false),
            new TrackInfo(0, 'Vanellope', 'Vanellope', false),
            new TrackInfo(1, 'Anxiety', 'Anxiety', false),
        ];
        // Filter out already unlocked tracks
        unlockableTracks = unlockableTracks.filter(
            (track) => !player.trackList.some((unlockedTrack) => unlockedTrack.trackCfgId === track.trackCfgId),
        );

        console.log(`unlockableTracks: ${JSON.stringify(unlockableTracks)}`);

        let unlockedTrack: TrackInfo | undefined = undefined;
        const didUnlockNewTrack = Math.random() < 0.5;
        if (didUnlockNewTrack && unlockableTracks.length > 0) {
            unlockedTrack = unlockableTracks[Math.floor(Math.random() * unlockableTracks.length)];
            console.log(`Player ${player.nickname} unlocked track: ${unlockedTrack!.trackName}`);
        }

        const data = new TrackSettlementServerResponseData(addExp, unlockedTrack ? [unlockedTrack] : []);
        const response = new TrackSettlementServerResponse(data);

        const updatePlayerDto = new UpdatePlayerDto(
            player.roleId,
            undefined,
            undefined,
            undefined,
            player.exp + data.addExp,
            unlockedTrack ? [...player.trackList, unlockedTrack] : undefined,
        );

        await this.playersService.updatePlayer(updatePlayerDto);

        return response;
    }
}
