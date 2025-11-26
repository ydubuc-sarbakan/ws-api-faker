import type { WsClientRequest } from './ws-client-request.js';

export abstract class WsRouter<T extends WsClientRequest> {
    private readonly _subRouters: WsRouter<T>[];

    protected constructor(subRouters: WsRouter<T>[] = []) {
        this._subRouters = subRouters;
    }

    abstract handled(response: WsClientRequest, socket: WebSocket): boolean;

    route(response: WsClientRequest, socket: WebSocket): boolean {
        if (this.handled(response, socket)) {
            return true;
        }

        for (const subRouter of this._subRouters) {
            if (subRouter.route(response, socket)) {
                return true;
            }
        }

        return false;
    }
}
