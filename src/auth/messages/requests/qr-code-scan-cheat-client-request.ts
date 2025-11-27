import { AppClientRequest } from '../../../app/types/app-client-response.js';

export class QrCodeScanCheatClientRequest extends AppClientRequest {
    static readonly ACTION: string = 'scan-qr-code-cheat';

    readonly playerId: string = '';
}
