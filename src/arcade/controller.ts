import { ArcadeService } from './service.js';
import { PlayerFinishedRaceClientRequest } from './messages/player-finished-race-client-request.js';
import type { PlayerFinishedCupClientRequest } from './messages/player-finished-cup-client-request.js';
import type { PlayerFinishedRaceDto } from './dtos/player-finished-race-dto.js';
import type { PlayerFinishedCupDto } from './dtos/player-finished-cup-dto.js';

export class ArcadeController {
    private readonly arcadeService: ArcadeService;

    constructor(arcadeService: ArcadeService = new ArcadeService()) {
        this.arcadeService = arcadeService;
    }

    async handlePlayerFinishedRaceClientRequest(
        request: PlayerFinishedRaceClientRequest,
        socket: WebSocket,
    ): Promise<void> {
        const dto: PlayerFinishedRaceDto = {
            playerId: request.playerId,
            position: request.position,
        };

        const responses = await this.arcadeService.onPlayerFinishedRace(dto);
        for (const response of responses) {
            socket.send(JSON.stringify(response));
        }
    }

    async handlePlayerFinishedCupClientRequest(
        request: PlayerFinishedCupClientRequest,
        socket: WebSocket,
    ): Promise<void> {
        const dto: PlayerFinishedCupDto = {
            playerId: request.playerId,
            position: request.position,
        };

        await this.arcadeService.onPlayerFinishedCup(dto);
    }
}
