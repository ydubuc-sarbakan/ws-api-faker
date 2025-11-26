import {Player} from "./models/player.js";
import {Stash} from "../app/managers/stash/stash.js";
import type {CreatePlayerDto} from "./dtos/create-player-dto.js";
import type {GetPlayerDto} from "./dtos/get-player-dto.js";
import type {UpdatePlayerDto} from "./dtos/update-player-dto.js";
import type {DeletePlayerDto} from "./dtos/delete-player-dto.js";

export class PlayersService {
    private readonly stash: Stash;

    constructor(
        stash: Stash = new Stash("players"),
    ) {
        this.stash = stash;
    }

    async createPlayer(dto: CreatePlayerDto) : Promise<Player> {
        const player: Player = {
            id: crypto.randomUUID(),
            ...dto,
        };

        try {
            const _ = await this.stash.put(player, player.id, false);
            return player;
        } catch (e) {
            throw new Error(`Failed to create player with name "${dto.name}": ${(e as Error).message}`);
        }
    }

    async getPlayer(dto: GetPlayerDto) : Promise<Player> {
        const player: Player | undefined = await this.stash.get<Player>(dto.id);
        if (!player) {
            throw new Error(`Failed to get player with id "${dto.id}"`);
        }

        return player;
    }

    async updatePlayer(dto: UpdatePlayerDto) : Promise<Player> {
        const player: Player = await this.getPlayer({ id: dto.id });

        if (dto.name) player.name = dto.name;
        if (dto.experienceToAdd) player.experience += dto.experienceToAdd;
        if (dto.unlockedSkinsToAdd) player.unlockedSkins.push(...dto.unlockedSkinsToAdd);
        if (dto.unlockedCupsToAdd) player.unlockedCups.push(...dto.unlockedCupsToAdd);

        try {
            const _ = await this.stash.put(player, player.id, true);
            return player;
        } catch (e) {
            throw new Error(`Failed to update player with id "${dto.id}": ${(e as Error).message}`);
        }
    }

    async deletePlayer(dto: DeletePlayerDto) : Promise<void> {
        try {
            await this.stash.delete(dto.id);
        } catch (e) {
            throw new Error(`Failed to delete player with id "${dto.id}": ${(e as Error).message}`);
        }
    }
}
