import { AppClientRequest } from '../../../app/types/app-client-response.js';

export class DeletePlayerClientRequest extends AppClientRequest {
    static readonly ACTION: string = 'delete-player';

    readonly id: string = '';
}
