import {CreatePlayerClientRequest} from "./messages/create-player-client-request.js";
import {GetPlayerClientRequest} from "./messages/get-player-client-request.js";
import {UpdatePlayerClientRequest} from "./messages/update-player-client-request.js";
import {DeletePlayerClientRequest} from "./messages/delete-player-client-request.js";
import {PlayersService} from "./service.js";
import type {CreatePlayerDto} from "./dtos/create-player-dto.js";
import type {GetPlayerDto} from "./dtos/get-player-dto.js";
import type {UpdatePlayerDto} from "./dtos/update-player-dto.js";
import type {DeletePlayerDto} from "./dtos/delete-player-dto.js";

export class PlayersController {
    private readonly playersService: PlayersService;

    constructor(
        playersService: PlayersService = new PlayersService()
    ) {
        this.playersService = playersService;
    }

    async handleCreatePlayerClientRequest(request: CreatePlayerClientRequest, socket: WebSocket): Promise<void> {
        const dto: CreatePlayerDto = {
            name: request.name,
            experience: 0,
            unlockedSkins: [],
            unlockedCups: [],
        };

        await this.playersService.createPlayer(dto);
    }

    async handleGetPlayerClientRequest(request: GetPlayerClientRequest, socket: WebSocket): Promise<void> {
        const dto: GetPlayerDto = {
            id: request.id,
        };

        await this.playersService.getPlayer(dto);
    }

    async handleUpdatePlayerClientRequest(request: UpdatePlayerClientRequest, socket: WebSocket): Promise<void> {
        const dto: UpdatePlayerDto = {
            id: request.id,
            name: request.name,
            experienceToAdd: undefined,
            unlockedSkinsToAdd: undefined,
            unlockedCupsToAdd: undefined,
        };

        await this.playersService.updatePlayer(dto);
    }

    async handleDeletePlayerClientRequest(request: DeletePlayerClientRequest, socket: WebSocket): Promise<void> {
        const dto: DeletePlayerDto = {
            id: request.id,
        };

        await this.playersService.deletePlayer(dto);
    }
}
