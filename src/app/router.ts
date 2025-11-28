import { WsRouter } from './core/types/ws-router.js';
import { AppEnvelope } from './types/app-envelope.js';
import { TestClientRequest } from './messages/requests/test-client-request.js';
import { PlayersRouter } from '../players/router.js';
import { CardsRouter } from '../cards/router.js';
import { AppController } from './controller.js';
import { ArcadeRouter } from '../arcade/router.js';
import { AuthRouter } from '../auth/router.js';
import { CheatsRouter } from '../cheats/router.js';

export class AppRouter extends WsRouter<AppEnvelope> {
    private readonly appController: AppController;

    constructor(
        appController: AppController = new AppController(),
        subRouters: WsRouter<AppEnvelope>[] = [
            new ArcadeRouter(),
            new CardsRouter(),
            new PlayersRouter(),
            new AuthRouter(),
            new CheatsRouter(),
        ],
    ) {
        super(subRouters);
        this.appController = appController;
    }

    handled(requestEnvelope: AppEnvelope, socket: WebSocket): boolean {
        console.log(requestEnvelope.action);

        switch (requestEnvelope.action) {
            case TestClientRequest.ACTION: {
                const request = requestEnvelope.openAs(TestClientRequest);
                this.tryHandling(() => this.appController.handleTestClientRequest(request, socket));
                return true;
            }
        }

        return false;
    }
}
