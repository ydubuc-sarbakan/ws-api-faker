import { AppClientRequest } from '../../../app/types/app-client-response.js';

export class ActivateCardClientRequest extends AppClientRequest {
    static readonly ACTION: string = 'activate_card';

    readonly cardId: string = '';
    readonly roleId: string = '';
}
