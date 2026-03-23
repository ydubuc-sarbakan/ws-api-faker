import type { TrackSettlementClientRequest } from './messages/requests/track-settlement-client-request.js';
import { ArcadeService } from './service.js';

export class ArcadeController {
    private readonly arcadeService: ArcadeService;

    constructor(arcadeService: ArcadeService = new ArcadeService()) {
        this.arcadeService = arcadeService;
    }

    async handleTrackSettlement(request: TrackSettlementClientRequest, socket: WebSocket): Promise<void> {
        const response = await this.arcadeService.handleTrackSettlement(request);
        socket.send(response.serialize());
    }
}
