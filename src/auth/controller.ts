import { PlayersService } from '../players/service.js';
import type { GetQrCodeClientRequest } from './messages/requests/get-qr-code-client-request.js';
import {
    GetQrCodeServerResponse,
    GetQrCodeServerResponseData,
} from './messages/responses/get-qr-code-server-response.js';
import { AuthService } from './service.js';

export class AuthController {
    private readonly authService: AuthService;
    private readonly playersService: PlayersService;

    constructor(authService: AuthService = new AuthService(), playersService: PlayersService = new PlayersService()) {
        this.authService = authService;
        this.playersService = playersService;
    }

    async handleGetQrCodeClientRequest(request: GetQrCodeClientRequest, socket: WebSocket): Promise<void> {
        const qrCodeUrl = await this.authService.generateQrCodeUrl(request.machineId);
        const qrCodeData = new GetQrCodeServerResponseData(qrCodeUrl, Date.now() + 5 * 60 * 1000); // QR code expires in 5 minutes
        const response = new GetQrCodeServerResponse(qrCodeData);
        socket.send(JSON.stringify(response));
    }
}
