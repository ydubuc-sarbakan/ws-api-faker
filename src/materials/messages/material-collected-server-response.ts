import type { Material } from '../models/material.js';
import { AppServerResponse } from '../../app/types/app-server-response.js';

export class MaterialCollectedServerResponse extends AppServerResponse {
    static readonly ACTION: string = 'material-collected';

    readonly id: string;
    readonly playerId: string;
    readonly name: string;
    readonly type: string;
    readonly amount: number;

    constructor(material: Material, amount: number) {
        super(MaterialCollectedServerResponse.ACTION);
        this.id = material.id;
        this.playerId = material.playerId;
        this.name = material.name;
        this.type = material.type;
        this.amount = amount;
    }
}
