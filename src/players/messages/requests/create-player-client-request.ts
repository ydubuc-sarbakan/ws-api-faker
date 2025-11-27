import { AppClientRequest } from '../../../app/types/app-client-response.js';

export class CreatePlayerClientRequest extends AppClientRequest {
    static readonly ACTION: string = 'create-player';

    readonly name: string = '';
}
