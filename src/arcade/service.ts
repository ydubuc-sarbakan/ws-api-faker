import { MaterialsService } from '../materials/service.js';
import { PlayersService } from '../players/service.js';
import type { PlayerFinishedRaceDto } from './dtos/player-finished-race-dto.js';
import type { PlayerFinishedCupDto } from './dtos/player-finished-cup-dto.js';
import { CardsService } from '../cards/service.js';
import type { AppServerResponse } from '../app/types/app-server-response.js';
import type { Player } from '../players/models/player.js';
import { ExperienceGenerator } from './utils/experience-generator.js';
import type { Material } from '../materials/models/material.js';
import { MaterialGenerator } from '../materials/utils/material-generator.js';
import type { CreateMaterialDto } from '../materials/dtos/create-material-dto.js';
import type { CreateCardDto } from '../cards/dtos/create-card-dto.js';
import { CardGenerator } from '../cards/utils/card-generator.js';
import type { UpdatePlayerDto } from '../players/dtos/update-player-dto.js';
import { CardCollectedServerResponse } from '../cards/messages/responses/card-collected-server-response.js';
import type { Card } from '../cards/models/card.js';
import { PlayerGainedExperienceServerResponse } from '../players/messages/responses/player-gained-experience-server-response.js';
import { MaterialCollectedServerResponse } from '../materials/messages/responses/material-collected-server-response.js';
import { LevelCalculator } from './utils/level-calculator.js';

export class ArcadeService {
    private readonly playersService: PlayersService;
    private readonly cardsService: CardsService;
    private readonly materialsService: MaterialsService;

    constructor(
        playersService: PlayersService = new PlayersService(),
        cardsService: CardsService = new CardsService(),
        materialsService: MaterialsService = new MaterialsService(),
    ) {
        this.playersService = playersService;
        this.cardsService = cardsService;
        this.materialsService = materialsService;
    }

    async onPlayerFinishedRace(dto: PlayerFinishedRaceDto): Promise<AppServerResponse[]> {
        const operations = [];
        const responses: AppServerResponse[] = [];

        const player: Player = await this.playersService.getPlayer({ id: dto.playerId });
        const previousLevel: number = player.level;
        const previousExperience: number = player.experience;

        // experience & levels
        const experienceGained: number = ExperienceGenerator.giveExperienceForRacePosition(dto.position);
        const experienceAndLevelsGained = LevelCalculator.determineExperienceAndLevelsGained(player, experienceGained);

        const newLevel: number = previousLevel + (experienceAndLevelsGained[1] as number);

        // TODO: get unlocked skins based on level thresholds

        const updatePlayerDto: UpdatePlayerDto = {
            id: player.id,
            name: undefined,
            experience: experienceAndLevelsGained[0],
            levelsToAdd: experienceAndLevelsGained[1],
            unlockedSkinsToAdd: undefined,
            unlockedCupsToAdd: undefined,
        };
        operations.push(
            this.playersService.updatePlayer(updatePlayerDto).then((player: Player) => {
                const response: PlayerGainedExperienceServerResponse = new PlayerGainedExperienceServerResponse(
                    player.id,
                    experienceGained,
                    previousLevel,
                    newLevel,
                    previousExperience,
                    experienceAndLevelsGained[0] as number,
                    LevelCalculator.levelThreshold(previousLevel),
                    LevelCalculator.levelThreshold(newLevel),
                );
                responses.push(response);
            }),
        );

        // material
        const materialGained: CreateMaterialDto = MaterialGenerator.generateCreateMaterialDtoForRace(
            dto.position,
            dto.playerId,
        );
        operations.push(
            this.materialsService.giveMaterial(materialGained).then((material: Material) => {
                const response: MaterialCollectedServerResponse = new MaterialCollectedServerResponse(
                    material,
                    materialGained.amount,
                );
                responses.push(response);
            }),
        );

        // // card
        // if (dto.position == 1) {
        //     const createCardDto: CreateCardDto = CardGenerator.generateCreateCardDto();
        //     operations.push(
        //         this.cardsService.createCard(createCardDto).then((card: Card) => {
        //             const response: CardCollectedServerResponse = new CardCollectedServerResponse(card);
        //             responses.push(response);
        //         }),
        //     );
        // }

        await Promise.all(operations);

        return responses;
    }

    async onPlayerFinishedCup(dto: PlayerFinishedCupDto): Promise<AppServerResponse[]> {
        const operations = [];
        const responses: AppServerResponse[] = [];

        const player: Player = await this.playersService.getPlayer({ id: dto.playerId });
        const previousLevel: number = player.level;
        const previousExperience: number = player.experience;

        // experience
        const experienceGained: number = ExperienceGenerator.giveExperienceForRacePosition(dto.position);
        const experienceAndLevelsGained = LevelCalculator.determineExperienceAndLevelsGained(player, experienceGained);

        const newLevel: number = previousLevel + (experienceAndLevelsGained[1] as number);

        const updatePlayerDto: UpdatePlayerDto = {
            id: player.id,
            name: undefined,
            experience: experienceAndLevelsGained[0],
            levelsToAdd: experienceAndLevelsGained[1],
            unlockedSkinsToAdd: undefined,
            unlockedCupsToAdd: undefined,
        };
        operations.push(
            this.playersService.updatePlayer(updatePlayerDto).then((player: Player) => {
                const response: PlayerGainedExperienceServerResponse = new PlayerGainedExperienceServerResponse(
                    player.id,
                    experienceGained,
                    previousLevel,
                    newLevel,
                    previousExperience,
                    experienceAndLevelsGained[0] as number,
                    LevelCalculator.levelThreshold(previousLevel),
                    LevelCalculator.levelThreshold(newLevel),
                );
                responses.push(response);
            }),
        );

        // material
        const materialGained: CreateMaterialDto = MaterialGenerator.generateCreateMaterialDtoForCup(
            dto.position,
            dto.playerId,
        );
        operations.push(
            this.materialsService.giveMaterial(materialGained).then((material: Material) => {
                const response: MaterialCollectedServerResponse = new MaterialCollectedServerResponse(
                    material,
                    materialGained.amount,
                );
                responses.push(response);
            }),
        );

        // card
        const createCardDto: CreateCardDto = CardGenerator.generateCreateCardDto();
        operations.push(
            this.cardsService.createCard(createCardDto).then((card: Card) => {
                const response: CardCollectedServerResponse = new CardCollectedServerResponse(card);
                responses.push(response);
            }),
        );

        await Promise.all(operations);

        return responses;
    }
}
