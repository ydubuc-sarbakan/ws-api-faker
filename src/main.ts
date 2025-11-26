import {WsClient} from "./app/core/ws-client.js";
import {WsConfig} from "./app/core/ws-config.js";
import {AppRouter} from "./app/router.js";

function main(): void {
    const _ = new WsClient({ port: WsConfig.PORT }, new AppRouter());
}

main();
