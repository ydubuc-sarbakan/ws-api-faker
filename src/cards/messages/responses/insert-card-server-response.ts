import { AppServerResponse } from '../../../app/types/app-server-response.js';
import type { Card } from '../../models/card.js';

export class InsertCardServerResponse extends AppServerResponse {
    static readonly ACTION: string = 'insert_card';

    readonly errMsg: string;
    readonly errCode: number;
    readonly data: Card | undefined;

    constructor(card: Card | undefined, errCode: number = 0, errMsg: string = '') {
        super(InsertCardServerResponse.ACTION);

        this.errCode = errCode;
        this.errMsg = errMsg;
        if (card) {
            this.data = card;
        }
    }
}
