import { WsServerResponse } from '../core/types/ws-server-response.js';

export abstract class AppServerResponse extends WsServerResponse {
    readonly action: string;

    constructor(action: string) {
        super();
        this.action = action;
    }

    serialize(): string {
        console.log('server responding with', this.action);
        return JSON.stringify(this);
    }
}
