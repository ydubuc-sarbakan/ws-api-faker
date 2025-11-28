import { CreatePlayerClientRequest } from './messages/requests/create-player-client-request.js';
import { GetPlayerClientRequest } from './messages/requests/get-player-client-request.js';
import { UpdatePlayerClientRequest } from './messages/requests/update-player-client-request.js';
import { DeletePlayerClientRequest } from './messages/requests/delete-player-client-request.js';
import { PlayersService } from './service.js';
import type { CreatePlayerDto } from './dtos/create-player-dto.js';
import type { GetPlayerDto } from './dtos/get-player-dto.js';
import type { UpdatePlayerDto } from './dtos/update-player-dto.js';
import type { DeletePlayerDto } from './dtos/delete-player-dto.js';
import { GetPlayerServerResponse } from './messages/responses/get-player-server-response.js';
import { Cups } from '../arcade/constants/cups.js';

export class PlayersController {
    private readonly playersService: PlayersService;

    constructor(playersService: PlayersService = new PlayersService()) {
        this.playersService = playersService;
    }

    async handleCreatePlayerClientRequest(request: CreatePlayerClientRequest, socket: WebSocket): Promise<void> {
        const dto: CreatePlayerDto = {
            name: request.name,
            experience: 0,
            level: 1,
            unlockedSkins: [],
            unlockedCups: [Cups.MICKEYS_CUP.id],
        };

        const _ = await this.playersService.createPlayer(dto);
    }

    async handleGetPlayerClientRequest(request: GetPlayerClientRequest, socket: WebSocket): Promise<void> {
        const dto: GetPlayerDto = {
            id: request.id,
        };

        const player = await this.playersService.getPlayer(dto);
        const response = new GetPlayerServerResponse(player);
        socket.send(response.serialize());
    }

    async handleUpdatePlayerClientRequest(request: UpdatePlayerClientRequest, socket: WebSocket): Promise<void> {
        const dto: UpdatePlayerDto = {
            id: request.id,
            name: request.name,
            experience: undefined,
            levelsToAdd: undefined,
            unlockedSkinsToAdd: undefined,
            unlockedCupsToAdd: undefined,
        };

        const _ = await this.playersService.updatePlayer(dto);
    }

    async handleDeletePlayerClientRequest(request: DeletePlayerClientRequest, socket: WebSocket): Promise<void> {
        const dto: DeletePlayerDto = {
            id: request.id,
        };

        await this.playersService.deletePlayer(dto);
    }
}
