import type { Stash } from './stash.js';

export class StashManager {
    private static instance: StashManager | null = null;
    public static Instance(): StashManager {
        if (this.instance === null) {
            this.instance = new StashManager();
        }
        return this.instance;
    }

    private _stashes: Map<string, Stash> = new Map();

    private constructor() {
        // init
    }

    getStash(id: string): Stash | undefined {
        return this._stashes.get(id);
    }

    addStash(stash: Stash, id: string): void {
        this._stashes.set(id, stash);
    }

    removeStash(id: string): void {
        this._stashes.delete(id);
    }
}
