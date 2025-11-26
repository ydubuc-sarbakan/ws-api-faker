import {AppClientRequest} from "../../app/types/app-client-response.js";

export class GetPlayerClientRequest extends AppClientRequest {
    static readonly ACTION: string = "get-player";

    readonly id: string = '';
}
