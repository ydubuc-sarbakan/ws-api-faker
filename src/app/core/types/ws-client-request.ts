export abstract class WsClientRequest {
    abstract deserialize(json: string): void;
}
