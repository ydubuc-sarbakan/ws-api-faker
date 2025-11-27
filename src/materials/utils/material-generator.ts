import type { CreateMaterialDto } from '../dtos/create-material-dto.js';
import { MaterialType } from '../enums/material-type.js';

export class MaterialGenerator {
    private static materials: string[][] = [
        ['2001', 'Mickey Emblem', MaterialType.MICKEY_EMBLEM],
        ['20002', 'Minnie Emblem', MaterialType.MINNIE_EMBLEM],
        ['20003', 'Donald Emblem', MaterialType.DONALD_EMBLEM],
        ['20004', 'Joy Emblem', MaterialType.JOY_EMBLEM],
        ['20005', 'Sadness Emblem', MaterialType.SADNESS_EMBLEM],
        ['20006', 'Anxiety Emblem', MaterialType.ANXIETY_EMBLEM],
        ['20007', 'Vanellope Emblem', MaterialType.VANELLOPE_EMBLEM],
        ['20008', 'Ralph Emblem', MaterialType.RALPH_EMBLEM],
        ['20009', 'Calhoun Emblem', MaterialType.CALHOUN_EMBLEM],
    ];

    private static flower: string[] = ['123456', 'Flower', MaterialType.FLOWER];

    static generateCreateMaterialDtoForRace(position: number, playerId: string): CreateMaterialDto {
        let material: string[];
        let amount: number;

        if (position < 5) {
            material = this.materials[Math.floor(Math.random() * this.materials.length)] as string[];
            amount = Math.floor(Math.random() * 5) + 1;
        } else {
            material = this.flower;
            amount = Math.floor(Math.random() * 20) + 10;
        }

        const dto: CreateMaterialDto = {
            playerId,
            gameDefinitionId: material[0] as string,
            name: material[1] as string,
            type: material[2] as string,
            amount,
        };

        return dto;
    }

    static generateCreateMaterialDtoForCup(position: number, playerId: string): CreateMaterialDto {
        let material: string[];
        let amount: number;

        if (position < 5) {
            material = this.materials[Math.floor(Math.random() * this.materials.length)] as string[];
            amount = Math.floor(Math.random() * 5) + 1;
        } else {
            material = this.flower;
            amount = Math.floor(Math.random() * 20) + 10;
        }

        const dto: CreateMaterialDto = {
            playerId,
            gameDefinitionId: material[0] as string,
            name: material[1] as string,
            type: material[2] as string,
            amount,
        };

        return dto;
    }
}
