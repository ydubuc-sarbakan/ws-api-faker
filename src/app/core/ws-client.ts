import http from 'http';
import { type ServerOptions, WebSocketServer } from 'ws';
import { ScanManager } from '../../auth/managers/scan-manager.js';
import {
    ReturnPlayerInfoServerResponse,
    ReturnPlayerInfoServerResponseData,
} from '../../players/messages/responses/return-player-info-response.js';
import type { Player } from '../../players/models/player.js';
import { StashManager } from '../managers/stash/stash-manager.js';
import { AppEnvelope } from '../types/app-envelope.js';
import type { WsClientRequest } from './types/ws-client-request.js';
import { WsRouter } from './types/ws-router.js';

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

        // mega hack
        const server = http.createServer((req, res) => {
            const playerIdMap: Record<string, string> = {
                '1': '2dd3f23c-ef98-4755-a834-d782eddcd862',
                '2': '20ddf5a5-1dd5-44b8-87b1-f83030055c97',
                '3': '60d723f6-f285-41e9-910b-b4875fa5d7ab',
                '4': '2ec147d8-9834-47d0-b32e-4bc28f8722e9',
            };

            console.log(`Received HTTP request: ${req.method} ${req.url}`);

            if (req.method === 'GET' && req.url?.startsWith('/auth/scan')) {
                let body = '';

                req.on('data', (chunk) => {
                    console.log('Received chunk:', chunk.toString());
                    body += chunk;
                });

                req.on('end', async () => {
                    res.writeHead(404, { 'Content-Type': 'application/json' });

                    try {
                        console.log('Received scan request with body:', body);

                        const url = req.url;
                        if (!url) {
                            return res.end(JSON.stringify({ error: 'Invalid request URL' }));
                        }

                        const machineId = new URL(url, `http://${req.headers.host}`).searchParams.get('machineId');
                        if (!machineId) {
                            return res.end(JSON.stringify({ error: 'Missing machineId' }));
                        }

                        const websocket = ScanManager.Instance().getScan(machineId);
                        if (!websocket) {
                            return res.end(JSON.stringify({ error: 'Scan session not found' }));
                        }

                        const playerId = playerIdMap[machineId];
                        if (!playerId) {
                            return res.end(JSON.stringify({ error: 'Invalid machineId' }));
                        }

                        const player = await StashManager.Instance().getStash('players')?.get<Player>(playerId);
                        if (!player) {
                            return res.end(JSON.stringify({ error: 'Player not found' }));
                        }

                        const data = new ReturnPlayerInfoServerResponseData(
                            player.roleId,
                            player.nickname,
                            player.avatarUrl,
                            player.lv,
                            player.exp,
                            player.trackList,
                        );
                        const response = new ReturnPlayerInfoServerResponse(data);
                        websocket?.send(JSON.stringify(response));
                        ScanManager.Instance().removeScan(machineId);

                        res.end(JSON.stringify({ message: 'Scan received' }));
                    } catch (e) {
                        console.error(e);
                        res.end(JSON.stringify({ message: e }));
                    }
                });
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Not found' }));
            }
        });

        server.listen(9003, '192.168.50.36', () => {
            console.log('HTTP server listening on port 9003');
        });
    }
}
