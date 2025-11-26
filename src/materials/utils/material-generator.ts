import type {CreateMaterialDto} from "../dtos/create-material-dto.js";
import {MaterialType} from "../enums/material-type.js";

export class MaterialGenerator {
    private static materials: string[][] = [
        [
            'Mickey Emblem',
            MaterialType.MICKEY_EMBLEM,
        ],
        [
            'Minnie Emblem',
            MaterialType.MINNIE_EMBLEM,
        ],
        [
            'Donald Emblem',
            MaterialType.DONALD_EMBLEM,
        ],
    ];

    private static flower: string[] = [
        'Flower',
        MaterialType.FLOWER,
    ];

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
            name: material[0] as string,
            type: material[1] as string,
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
            name: material[0] as string,
            type: material[1] as string,
            amount,
        };

        return dto;
    }
}
