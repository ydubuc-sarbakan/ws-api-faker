import type {CreateCardDto} from "../dtos/create-card-dto.js";

export class CardGenerator {
    private static names: string[] = [
        'Speedster',
        'Thunderbolt',
        'Shadow Racer',
        'Blaze',
        'Nitro',
        'Vortex',
        'Phantom',
        'Rocket',
        'Cyclone',
        'Turbo',
    ];

    private static racerIds: string[] = [
        "Mickey",
        "Minnie",
        "Donald",
    ]

    private static rarities: string[] = [
        'HR',
        'SER',
        'SRR',
        'SR',
        'R',
        'N',
    ];

    static generateCreateCardDto(): CreateCardDto {
        const dto: CreateCardDto = {
            name: this.names[Math.floor(Math.random() * this.names.length)] as string,
            racerId: this.racerIds[Math.floor(Math.random() * this.racerIds.length)] as string,
            rarity: this.rarities[Math.floor(Math.random() * this.rarities.length)] as string,
            experience: 0,
            unlockedSkins: [],
        };

        return dto;
    }
}
