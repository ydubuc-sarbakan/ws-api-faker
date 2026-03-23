import { CreatePlayerDto } from '../players/dtos/create-player-dto.js';
import {
    ReturnPlayerInfoServerResponse,
    ReturnPlayerInfoServerResponseData,
} from '../players/messages/responses/return-player-info-response.js';
import { PlayersService } from '../players/service.js';
import type { CreatePlayerCheatClientRequest } from './messages/requests/create-player-cheat-client-request.js';
import type { QrCodeScanCheatClientRequest } from './messages/requests/qr-code-scan-cheat-client-request.js';
import { CheatsService } from './service.js';

export class CheatsController {
    private readonly cheatsService: CheatsService;
    private readonly playersService: PlayersService;

    constructor(
        cheatsService: CheatsService = new CheatsService(),
        playersService: PlayersService = new PlayersService(),
    ) {
        this.cheatsService = cheatsService;
        this.playersService = playersService;
    }

    async handleQrCodeScanCheatClientRequest(request: QrCodeScanCheatClientRequest, socket: WebSocket): Promise<void> {
        const player = await this.playersService.getPlayer({ roleId: request.roleId });
        const playerInfo = new ReturnPlayerInfoServerResponseData(
            player.roleId,
            player.nickname,
            player.avatarUrl,
            player.lv,
            player.exp,
            player.trackList,
        );
        const response = new ReturnPlayerInfoServerResponse(playerInfo);
        socket.send(response.serialize());
    }

    async handleCreatePlayerCheatClientRequest(
        request: CreatePlayerCheatClientRequest,
        socket: WebSocket,
    ): Promise<void> {
        const createPlayerDto: CreatePlayerDto = new CreatePlayerDto(
            request.nickname,
            request.avatarUrl,
            request.lv,
            request.exp,
            [],
        );
        const player = await this.playersService.createPlayer(createPlayerDto);
        const response = new ReturnPlayerInfoServerResponse(
            new ReturnPlayerInfoServerResponseData(
                player.roleId,
                player.nickname,
                player.avatarUrl,
                player.lv,
                player.exp,
                player.trackList,
            ),
        );
        socket.send(response.serialize());
    }
}
