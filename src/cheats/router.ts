import { WsRouter } from '../app/core/types/ws-router.js';
import type { AppEnvelope } from '../app/types/app-envelope.js';
import { CheatsController } from './controller.js';
import { QrCodeScanCheatClientRequest } from './messages/requests/qr-code-scan-cheat-client-request.js';
import { CreatePlayerCheatClientRequest } from './messages/requests/create-player-cheat-client-request.js';

export class CheatsRouter extends WsRouter<AppEnvelope> {
    private readonly cheatsController: CheatsController;

    constructor(
        cheatsController: CheatsController = new CheatsController(),
        subRouters: WsRouter<AppEnvelope>[] = [
            // you can add sub-routers here
        ],
    ) {
        super(subRouters);
        this.cheatsController = cheatsController;
    }

    handled(requestEnvelope: AppEnvelope, socket: WebSocket): boolean {
        switch (requestEnvelope.action) {
            case QrCodeScanCheatClientRequest.ACTION: {
                const request = requestEnvelope.openAs(QrCodeScanCheatClientRequest);
                this.tryHandling(() => this.cheatsController.handleQrCodeScanCheatClientRequest(request, socket));
                return true;
            }
            case CreatePlayerCheatClientRequest.ACTION: {
                const request = requestEnvelope.openAs(CreatePlayerCheatClientRequest);
                this.tryHandling(() => this.cheatsController.handleCreatePlayerCheatClientRequest(request, socket));
                return true;
            }
        }

        return false;
    }
}
