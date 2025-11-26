import {WsClientRequest} from "../core/types/ws-client-request.js";

export class AppEnvelope extends WsClientRequest {
    action: string = '';
    private _json: string = '';

    openAs<T extends WsClientRequest>(ctor: new () => T): T {
        const content = new ctor();
        content.deserialize(this._json);
        return content;
    }

    deserialize(json: string) {
        Object.assign(this, json);
        this._json = json;
    }
}
