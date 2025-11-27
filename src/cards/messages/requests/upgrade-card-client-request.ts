import { AppClientRequest } from '../../../app/types/app-client-response.js';

export class UpgradeCardClientRequest extends AppClientRequest {
    static readonly ACTION: string = 'upgrade-card';

    readonly id: string = '';
    readonly upgradeMaterialId: string = '';
    readonly upgradeMaterialAmount: number = 0;
}
