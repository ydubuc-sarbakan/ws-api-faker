import { WsServerRequest } from '../core/types/ws-server-request.js';

export abstract class AppServerRequest extends WsServerRequest {
    readonly action: string;

    constructor(action: string) {
        super();
        this.action = action;
    }

    serialize(): string {
        return JSON.stringify(this);
    }
}
