import { AppClientRequest } from '../../../app/types/app-client-response.js';

export class BuyCardClientRequest extends AppClientRequest {
    static readonly ACTION: string = 'buy-card';
}
