import { WsClient } from './app/core/ws-client.js';
import { WsConfig } from './app/core/ws-config.js';
import { AppRouter } from './app/router.js';
import { StashManager } from './app/managers/stash/stash-manager.js';
import { Stash } from './app/managers/stash/stash.js';

function main(): void {
    const stashManager = StashManager.Instance();
    stashManager.addStash(new Stash('app'), 'app');
    stashManager.addStash(new Stash('cards'), 'cards');
    stashManager.addStash(new Stash('materials'), 'materials');
    stashManager.addStash(new Stash('players'), 'players');

    const _ = new WsClient({ host: '0.0.0.0', port: WsConfig.PORT }, new AppRouter());
}

main();
