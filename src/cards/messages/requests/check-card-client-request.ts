import { AppClientRequest } from '../../../app/types/app-client-response.js';

export class CheckCardClientRequest extends AppClientRequest {
    static readonly ACTION: string = 'check_card';

    readonly cardId: string = '';
}
