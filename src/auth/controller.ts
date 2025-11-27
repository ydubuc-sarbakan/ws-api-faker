import { AuthService } from './service.js';
import type { GetQrCodeClientRequest } from './messages/requests/get-qr-code-client-request.js';
import type { QrCodeScanCheatClientRequest } from './messages/requests/qr-code-scan-cheat-client-request.js';
import { PlayersService } from '../players/service.js';
import { GetPlayerServerResponse } from '../players/messages/responses/get-player-server-response.js';

export class AuthController {
    private readonly authService: AuthService;
    private readonly playersService: PlayersService;

    constructor(authService: AuthService = new AuthService(), playersService: PlayersService = new PlayersService()) {
        this.authService = authService;
        this.playersService = playersService;
    }

    async handleGetQrCodeClientRequest(request: GetQrCodeClientRequest, socket: WebSocket): Promise<void> {
        const qrCodeData = await this.authService.generateQrCodeUrl(request.machineId);
        socket.send(qrCodeData);
    }

    async handleQrCodeScanCheatClientRequest(request: QrCodeScanCheatClientRequest, socket: WebSocket): Promise<void> {
        const player = await this.playersService.getPlayer({ id: request.playerId });
        const response = new GetPlayerServerResponse(player);
        socket.send(response.serialize());
    }
}
