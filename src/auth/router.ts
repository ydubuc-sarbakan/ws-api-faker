import type { AppEnvelope } from '../app/types/app-envelope.js';
import { WsRouter } from '../app/core/types/ws-router.js';
import { AuthController } from './controller.js';
import { GetQrCodeClientRequest } from './messages/requests/get-qr-code-client-request.js';

export class AuthRouter extends WsRouter<AppEnvelope> {
    private readonly authController: AuthController;

    constructor(
        authController: AuthController = new AuthController(),
        subRouters: WsRouter<AppEnvelope>[] = [
            // you can add sub-routers here
        ],
    ) {
        super(subRouters);
        this.authController = authController;
    }

    handled(requestEnvelope: AppEnvelope, socket: WebSocket): boolean {
        switch (requestEnvelope.action) {
            case GetQrCodeClientRequest.ACTION: {
                const request = requestEnvelope.openAs(GetQrCodeClientRequest);
                this.tryHandling(() => this.authController.handleGetQrCodeClientRequest(request, socket));
                return true;
            }
        }

        return false;
    }
}
