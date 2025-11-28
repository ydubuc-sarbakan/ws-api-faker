import { AuthService } from './service.js';
import type { GetQrCodeClientRequest } from './messages/requests/get-qr-code-client-request.js';
import { PlayersService } from '../players/service.js';

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
}
