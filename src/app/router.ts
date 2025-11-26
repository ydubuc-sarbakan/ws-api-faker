import { WsRouter } from './core/types/ws-router.js';
import { AppEnvelope } from './types/app-envelope.js';
import { TestClientRequest } from './messages/test-client-request.js';
import { PlayersRouter } from '../players/router.js';
import { CardsRouter } from '../cards/router.js';
import { AppController } from './controller.js';
import { ArcadeRouter } from '../arcade/router.js';

export class AppRouter extends WsRouter<AppEnvelope> {
    private readonly appController: AppController;

    constructor(
        appController: AppController = new AppController(),
        subRouters: WsRouter<AppEnvelope>[] = [new ArcadeRouter(), new CardsRouter(), new PlayersRouter()],
    ) {
        super(subRouters);
        this.appController = appController;
    }

    handled(requestEnvelope: AppEnvelope, socket: WebSocket): boolean {
        switch (requestEnvelope.action) {
            case TestClientRequest.ACTION:
                this.appController.handleTestClientRequest(requestEnvelope.openAs(TestClientRequest), socket);
                return true;
            default:
                return false;
        }
    }
}
