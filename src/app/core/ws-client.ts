import { type ServerOptions, WebSocketServer } from 'ws';
import { AppEnvelope } from '../types/app-envelope.js';
import { WsConfig } from './ws-config.js';
import { WsRouter } from './types/ws-router.js';
import type { WsClientRequest } from './types/ws-client-request.js';

export class WsClient {
    constructor(options: ServerOptions, router: WsRouter<WsClientRequest>) {
        let ws: WebSocketServer = new WebSocketServer(options);

        ws.on('connection', (socket) => {
            console.log('New client connected');

            socket.on('message', (message) => {
                console.log('');
                console.log('*** new request ***');
                try {
                    const envelope = new AppEnvelope();
                    envelope.deserialize(JSON.parse(message.toString()));
                    // @ts-ignore
                    router.route(envelope, socket);
                } catch (e) {
                    console.error(e);
                }
            });

            socket.on('close', () => {
                console.log('Client disconnected');
            });
        });

        console.log(`WebSocket server is running on ws://${options.host}:${options.port}`);
    }
}
