import { writeFile, readFile, unlink, mkdir, rmdir } from 'fs/promises';

export class Stash {
    private static ROOT_DIR: string = './data';

    private readonly _name: string;
    private _data: Map<string, any> = new Map();

    constructor(name: string) {
        this._name = name;
    }

    async put<T>(value: T, key: string, updateIfExists: boolean): Promise<T> {
        const exists = await this.has(key);
        if (exists && !updateIfExists) {
            throw new Error(`Key "${key}" already exists in stash.`);
        }

        await mkdir(this.path(), { recursive: true });
        let valueToWrite: T | undefined = await this.get(key);
        if (valueToWrite) {
            Object.assign(valueToWrite, value);
        } else {
            valueToWrite = value;
        }

        await writeFile(this.pathToKey(key), JSON.stringify(valueToWrite), 'utf8');
        this._data.set(key, value);

        return valueToWrite;
    }

    async get<T>(key: string): Promise<T | undefined> {
        if (await this.has(key)) {
            return this._data.get(key) as T;
        }

        return undefined;
    }

    async has(key: string): Promise<boolean> {
        if (this._data.has(key)) {
            return true;
        }

        try {
            const data = await readFile(this.pathToKey(key), 'utf8');
            const parsed = JSON.parse(data);
            this._data.set(key, parsed);

            return true;
        } catch (e) {
            return false;
        }
    }

    async delete(key: string): Promise<void> {
        this._data.delete(key);
        await unlink(this.pathToKey(key));
    }

    async clear(): Promise<void> {
        this._data.clear();
        await rmdir(this.pathToKey(this.path()));
    }

    private pathToKey(key: string): string {
        return `${this.path()}/${key}.json`;
    }

    private path(): string {
        return `${Stash.ROOT_DIR}/${this._name}`;
    }
}
