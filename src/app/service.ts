import { TestServerResponse } from './messages/responses/test-server-response.js';
import { TestClientRequest } from './messages/requests/test-client-request.js';
import { Stash } from './managers/stash/stash.js';
import { StashManager } from './managers/stash/stash-manager.js';

export class AppService {
    private readonly stash: Stash;

    constructor(stash: Stash = StashManager.Instance().getStash('app')!) {
        this.stash = stash;
    }

    async handleTestClientRequest(testClientRequest: TestClientRequest): Promise<TestServerResponse> {
        const response = new TestServerResponse(
            testClientRequest.stringValue,
            testClientRequest.stringArray,
            testClientRequest.intValue,
            testClientRequest.intArray,
            testClientRequest.floatValue,
            testClientRequest.floatArray,
            testClientRequest.boolValue,
            testClientRequest.boolArray,
        );

        console.log('Handled TestClientRequest:', response.serialize());

        return response;
    }
}
