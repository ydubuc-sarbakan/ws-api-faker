import { AppClientRequest } from '../../../app/types/app-client-response.js';

export class InsertCardClientRequest extends AppClientRequest {
    static readonly ACTION: string = 'insert_card';

    readonly cardId: string = '';
    readonly roleId: string = '';
}
