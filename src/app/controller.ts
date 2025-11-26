import {AppService} from "./service.js";
import {TestClientRequest} from "./messages/test-client-request.js";

export class AppController {
    private readonly appService: AppService;

    constructor(
        appService: AppService = new AppService()
    ) {
        this.appService = appService;
    }

    async handleTestClientRequest(request: TestClientRequest, socket: WebSocket): Promise<void> {
        const response = await this.appService.handleTestClientRequest(request);
        socket.send(JSON.stringify(response));
    }
}
