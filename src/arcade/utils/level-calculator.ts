import type { Player } from '../../players/models/player.js';

export class LevelCalculator {
    static determineExperienceAndLevelsGained(player: Player, experienceGained: number): number[] {
        let currentLevel = player.level;
        let currentExperience = player.experience + experienceGained;
        let levelsGained = 0;

        let determiningLevel = true;
        while (determiningLevel) {
            const levelThreshold = LevelCalculator.levelThreshold(currentLevel);

            if (currentExperience >= levelThreshold) {
                levelsGained += 1;
                currentLevel += 1;
                currentExperience -= levelThreshold;
            } else {
                determiningLevel = false;
            }
        }

        return [currentExperience, levelsGained];
    }

    private static levelThreshold(currentLevel: number): number {
        return 100 + (currentLevel - 1) * 50;
    }
}
