import { AppClientRequest } from '../../../app/types/app-client-response.js';

export class UpdatePlayerClientRequest extends AppClientRequest {
    static readonly ACTION: string = 'update-player';

    readonly id: string = '';
    readonly name: string = '';
}
