import { AppClientRequest } from '../../../app/types/app-client-response.js';

export class GetQrCodeClientRequest extends AppClientRequest {
    static readonly ACTION: string = 'get_qr_code';

    readonly machineId: string = '';
}
