import {WsClientRequest} from "../core/types/ws-client-request.js";

export abstract class AppClientRequest extends WsClientRequest {
    readonly action: string = '';

    deserialize(json: string): void {
        Object.assign(this, json);
    }
}
