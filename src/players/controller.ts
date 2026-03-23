import type { CreatePlayerDto } from './dtos/create-player-dto.js';
import type { DeletePlayerDto } from './dtos/delete-player-dto.js';
import { CreatePlayerClientRequest } from './messages/requests/create-player-client-request.js';
import { DeletePlayerClientRequest } from './messages/requests/delete-player-client-request.js';
import {
    ReturnPlayerInfoServerResponse,
    ReturnPlayerInfoServerResponseData,
} from './messages/responses/return-player-info-response.js';
import { PlayersService } from './service.js';

export class PlayersController {
    private readonly playersService: PlayersService;

    constructor(playersService: PlayersService = new PlayersService()) {
        this.playersService = playersService;
    }

    async handleCreatePlayerClientRequest(request: CreatePlayerClientRequest, socket: WebSocket): Promise<void> {
        const dto: CreatePlayerDto = {
            nickname: request.nickname,
            avatarUrl: '',
            lv: 0,
            exp: 0,
            trackList: [],
        };
        const player = await this.playersService.createPlayer(dto);
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

    async handleDeletePlayerClientRequest(request: DeletePlayerClientRequest, socket: WebSocket): Promise<void> {
        const dto: DeletePlayerDto = {
            roleId: request.roleId,
        };

        await this.playersService.deletePlayer(dto);
    }
}
