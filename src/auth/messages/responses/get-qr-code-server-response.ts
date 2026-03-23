import { AppServerResponse } from '../../../app/types/app-server-response.js';

export class GetQrCodeServerResponse extends AppServerResponse {
    static readonly ACTION: string = 'get_qr_code';

    readonly errCode: number;
    readonly errMsg: string;
    readonly data: GetQrCodeServerResponseData | undefined;

    constructor(data: GetQrCodeServerResponseData | undefined, errCode: number = 0, errMsg: string = '') {
        super(GetQrCodeServerResponse.ACTION);

        this.errCode = errCode;
        this.errMsg = errMsg;
        if (data) {
            this.data = data;
        }
    }
}

export class GetQrCodeServerResponseData {
    readonly qrCodeUrl: string;
    readonly expireAt: number;

    constructor(qrCodeUrl: string, expireAt: number) {
        this.qrCodeUrl = qrCodeUrl;
        this.expireAt = expireAt;
    }
}
