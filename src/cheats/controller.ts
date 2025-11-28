import { CheatsService } from './service.js';
import type { QrCodeScanCheatClientRequest } from './messages/requests/qr-code-scan-cheat-client-request.js';
import { PlayersService } from '../players/service.js';
import { GetPlayerServerResponse } from '../players/messages/responses/get-player-server-response.js';
import { CreatePlayerDto } from '../players/dtos/create-player-dto.js';
import type { CreatePlayerCheatClientRequest } from './messages/requests/create-player-cheat-client-request.js';

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
        const player = await this.playersService.getPlayer({ id: request.playerId });
        const response = new GetPlayerServerResponse(player);
        socket.send(response.serialize());
    }

    async handleCreatePlayerCheatClientRequest(
        request: CreatePlayerCheatClientRequest,
        socket: WebSocket,
    ): Promise<void> {
        const createPlayerDto: CreatePlayerDto = new CreatePlayerDto(
            request.name,
            request.experience,
            request.level,
            request.unlockedSkins,
            request.unlockedCups,
        );
        const player = await this.playersService.createPlayer(createPlayerDto);
        const response = new GetPlayerServerResponse(player);
        socket.send(response.serialize());
    }
}
