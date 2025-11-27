import { Player } from './models/player.js';
import { Stash } from '../app/managers/stash/stash.js';
import type { CreatePlayerDto } from './dtos/create-player-dto.js';
import type { GetPlayerDto } from './dtos/get-player-dto.js';
import type { UpdatePlayerDto } from './dtos/update-player-dto.js';
import type { DeletePlayerDto } from './dtos/delete-player-dto.js';
import { StashManager } from '../app/managers/stash/stash-manager.js';

export class PlayersService {
    private readonly stash: Stash;

    constructor(stash: Stash = StashManager.Instance().getStash('players')!) {
        this.stash = stash;
    }

    async createPlayer(dto: CreatePlayerDto): Promise<Player> {
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

    async getPlayer(dto: GetPlayerDto): Promise<Player> {
        const player: Player | undefined = await this.stash.get<Player>(dto.id);
        if (!player) {
            throw new Error(`Failed to get player with id "${dto.id}"`);
        }

        console.log('PlayersService getPlayer: ', JSON.stringify(player));
        return player;
    }

    async updatePlayer(dto: UpdatePlayerDto): Promise<Player> {
        const player: Player = await this.getPlayer({ id: dto.id });
        let updatedPlayer: any = { ...player };

        if (dto.name) updatedPlayer.name = dto.name;
        if (dto.experience) updatedPlayer.experience = dto.experience;
        if (dto.levelsToAdd) updatedPlayer.level += dto.levelsToAdd;
        if (dto.unlockedSkinsToAdd) updatedPlayer.unlockedSkins.push(...dto.unlockedSkinsToAdd);
        if (dto.unlockedCupsToAdd) updatedPlayer.unlockedCups.push(...dto.unlockedCupsToAdd);

        console.log('PlayersService updatePlayer - updatedPlayer: ', JSON.stringify(updatedPlayer));

        try {
            const temp = await this.stash.put(updatedPlayer, player.id, true);
            console.log('PlayersService updatePlayer - temp: ', JSON.stringify(temp));
            const temp2 = await this.stash.get(player.id);
            console.log('PlayersService updatePlayer - temp2: ', JSON.stringify(temp2));
            return updatedPlayer as Player;
        } catch (e) {
            throw new Error(`Failed to update player with id "${dto.id}": ${(e as Error).message}`);
        }
    }

    async deletePlayer(dto: DeletePlayerDto): Promise<void> {
        try {
            await this.stash.delete(dto.id);
        } catch (e) {
            throw new Error(`Failed to delete player with id "${dto.id}": ${(e as Error).message}`);
        }
    }
}
