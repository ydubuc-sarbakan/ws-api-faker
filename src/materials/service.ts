import { Stash } from '../app/managers/stash/stash.js';
import type { CreateMaterialDto } from './dtos/create-material-dto.js';
import { Material } from './models/material.js';
import type { GetMaterialDto } from './dtos/get-material-dto.js';
import type { DeleteMaterialDto } from './dtos/delete-material-dto.js';
import type { UpdateMaterialDto } from './dtos/update-material-dto.js';
import { StashManager } from '../app/managers/stash/stash-manager.js';

export class MaterialsService {
    private readonly stash: Stash;

    constructor(stash: Stash = StashManager.Instance().getStash('materials')!) {
        this.stash = stash;
    }

    async createMaterial(dto: CreateMaterialDto): Promise<Material> {
        const materialId = `${dto.playerId}-${dto.type}`;
        let material: Material = {
            id: materialId,
            ...dto,
        };

        try {
            const _ = await this.stash.put(material, material.id, false);
            return material;
        } catch (e) {
            throw new Error(`Failed to create material with name: ${(e as Error).message}`);
        }
    }

    async giveMaterial(dto: CreateMaterialDto): Promise<Material> {
        const materialId = `${dto.playerId}-${dto.type}`;
        let material: Material;

        try {
            // if material exists, update it
            material = await this.getMaterial({ id: materialId });
            const updateDto: UpdateMaterialDto = {
                id: material.id,
                amountToModify: dto.amount,
            };

            return this.updateMaterial(updateDto);
        } catch (e) {
            // material doesn't exist, create it
            material = {
                id: materialId,
                ...dto,
            };
        }

        try {
            const _ = await this.stash.put(material, material.id, true);
            return material;
        } catch (e) {
            throw new Error(`Failed to create material with name: ${(e as Error).message}`);
        }
    }

    async getMaterial(dto: GetMaterialDto): Promise<Material> {
        const material: Material | undefined = await this.stash.get<Material>(dto.id);
        if (!material) {
            throw new Error(`Failed to get material with id "${dto.id}"`);
        }

        return material;
    }

    async updateMaterial(dto: UpdateMaterialDto): Promise<Material> {
        const material: Material = await this.getMaterial({ id: dto.id });
        const updatedMaterial: any = { ...material };

        if (dto.amountToModify) updatedMaterial.amount += dto.amountToModify;

        try {
            const _ = await this.stash.put(updatedMaterial, material.id, true);
            return updatedMaterial as Material;
        } catch (e) {
            throw new Error(`Failed to update material with name: ${(e as Error).message}`);
        }
    }

    async deleteMaterial(dto: DeleteMaterialDto): Promise<void> {
        try {
            await this.stash.delete(dto.id);
        } catch (e) {
            throw new Error(`Failed to delete material with id "${dto.id}": ${(e as Error).message}`);
        }
    }
}
