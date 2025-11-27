import { AppServerResponse } from '../../../app/types/app-server-response.js';

export class GetQrCodeServerResponse extends AppServerResponse {
    static readonly ACTION: string = 'get-qr-code';

    readonly url: string;

    constructor(url: string) {
        super(GetQrCodeServerResponse.ACTION);
        this.url = url;
    }
}
