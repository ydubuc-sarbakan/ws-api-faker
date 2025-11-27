import { WsRouter } from '../app/core/types/ws-router.js';
import type { AppEnvelope } from '../app/types/app-envelope.js';
import { CreatePlayerClientRequest } from './messages/requests/create-player-client-request.js';
import { GetPlayerClientRequest } from './messages/requests/get-player-client-request.js';
import { DeletePlayerClientRequest } from './messages/requests/delete-player-client-request.js';
import { UpdatePlayerClientRequest } from './messages/requests/update-player-client-request.js';
import { PlayersController } from './controller.js';

export class PlayersRouter extends WsRouter<AppEnvelope> {
    private readonly playersController: PlayersController;

    constructor(
        playersController: PlayersController = new PlayersController(),
        subRouters: WsRouter<AppEnvelope>[] = [
            // you can add sub-routers here
        ],
    ) {
        super(subRouters);
        this.playersController = playersController;
    }

    handled(requestEnvelope: AppEnvelope, socket: WebSocket): boolean {
        switch (requestEnvelope.action) {
            case CreatePlayerClientRequest.ACTION: {
                this.playersController.handleCreatePlayerClientRequest(
                    requestEnvelope.openAs(CreatePlayerClientRequest),
                    socket,
                );
                return true;
            }
            case GetPlayerClientRequest.ACTION: {
                this.playersController.handleGetPlayerClientRequest(
                    requestEnvelope.openAs(GetPlayerClientRequest),
                    socket,
                );
                return true;
            }
            case UpdatePlayerClientRequest.ACTION: {
                this.playersController.handleUpdatePlayerClientRequest(
                    requestEnvelope.openAs(UpdatePlayerClientRequest),
                    socket,
                );
                return true;
            }
            case DeletePlayerClientRequest.ACTION: {
                this.playersController.handleDeletePlayerClientRequest(
                    requestEnvelope.openAs(DeletePlayerClientRequest),
                    socket,
                );
                return true;
            }
            default:
                return false;
        }
    }
}
