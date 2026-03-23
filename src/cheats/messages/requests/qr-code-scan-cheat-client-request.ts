import { AppClientRequest } from '../../../app/types/app-client-response.js';

export class QrCodeScanCheatClientRequest extends AppClientRequest {
    static readonly ACTION: string = 'scan_qr_code_cheat';

    readonly roleId: string = '';
}
