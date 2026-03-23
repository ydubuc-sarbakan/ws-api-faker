import { StashManager } from '../app/managers/stash/stash-manager.js';
import { Stash } from '../app/managers/stash/stash.js';
import type { CreatePlayerDto } from './dtos/create-player-dto.js';
import type { DeletePlayerDto } from './dtos/delete-player-dto.js';
import type { GetPlayerDto } from './dtos/get-player-dto.js';
import type { UpdatePlayerDto } from './dtos/update-player-dto.js';
import { Player } from './models/player.js';

export class PlayersService {
    private readonly stash: Stash;

    constructor(stash: Stash = StashManager.Instance().getStash('players')!) {
        this.stash = stash;
    }

    async createPlayer(dto: CreatePlayerDto): Promise<Player> {
        const player: Player = {
            roleId: crypto.randomUUID(),
            ...dto,
        };

        try {
            const _ = await this.stash.put(player, player.roleId, false);
            return player;
        } catch (e) {
            throw new Error(`Failed to create player with name "${dto.nickname}": ${(e as Error).message}`);
        }
    }

    async getPlayer(dto: GetPlayerDto): Promise<Player> {
        const player: Player | undefined = await this.stash.get<Player>(dto.roleId);
        if (!player) {
            throw new Error(`Failed to get player with id "${dto.roleId}"`);
        }

        return player;
    }

    async updatePlayer(dto: UpdatePlayerDto): Promise<Player> {
        const player: Player = await this.getPlayer({ roleId: dto.roleId });
        let updatedPlayer: any = { ...player };

        if (dto.nickname) updatedPlayer.name = dto.nickname;
        if (dto.lv) updatedPlayer.lv = dto.lv;
        if (dto.exp) updatedPlayer.exp = dto.exp;
        if (dto.trackList) updatedPlayer.trackList = dto.trackList;

        try {
            const _ = await this.stash.put(updatedPlayer, player.roleId, true);
            return updatedPlayer as Player;
        } catch (e) {
            throw new Error(`Failed to update player with id "${dto.roleId}": ${(e as Error).message}`);
        }
    }

    async deletePlayer(dto: DeletePlayerDto): Promise<void> {
        try {
            await this.stash.delete(dto.roleId);
        } catch (e) {
            throw new Error(`Failed to delete player with id "${dto.roleId}": ${(e as Error).message}`);
        }
    }
}
