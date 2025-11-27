import type { CreateCardDto } from '../dtos/create-card-dto.js';

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

    private static cards: CardInfo[] = [
        {
            racerId: 'Mickey',
            name: 'Mickey Mouse',
            skins: [
                { id: 'Mickey_Default' },
                { id: '1' },
                { id: '7' },
                { id: '13' },
                { id: '19' },
                { id: '25' },
                { id: '31' },
            ],
        },
        {
            racerId: 'Minnie',
            name: 'Minnie Mouse',
            skins: [
                { id: 'Minnie_Default' },
                { id: '37' },
                { id: '43' },
                { id: '49' },
                { id: '55' },
                { id: '61' },
                { id: '67' },
            ],
        },
        {
            racerId: 'Donald',
            name: 'Donald Duck',
            skins: [
                { id: 'Donald_Default' },
                { id: '73' },
                { id: '79' },
                { id: '85' },
                { id: '91' },
                { id: '97' },
                { id: '103' },
            ],
        },
        {
            racerId: 'Joy',
            name: 'Joy',
            skins: [
                { id: 'Joy_Default' },
                { id: '109' },
                { id: '115' },
                { id: '121' },
                { id: '127' },
                { id: '133' },
                { id: '139' },
            ],
        },
        {
            racerId: 'Sadness',
            name: 'Sadness',
            skins: [
                { id: 'Sadness_Default' },
                { id: '145' },
                { id: '151' },
                { id: '157' },
                { id: '163' },
                { id: '169' },
                { id: '175' },
            ],
        },
        {
            racerId: 'Anxiety',
            name: 'Anxiety',
            skins: [
                { id: 'Anxiety_Default' },
                { id: '181' },
                { id: '187' },
                { id: '193' },
                { id: '199' },
                { id: '205' },
                { id: '211' },
            ],
        },
        {
            racerId: 'Vanellope',
            name: 'Vanellope von Schweetz',
            skins: [
                { id: 'Vanellope_Default' },
                { id: '217' },
                { id: '223' },
                { id: '229' },
                { id: '235' },
                { id: '241' },
                { id: '247' },
            ],
        },
        {
            racerId: 'Ralph',
            name: 'Wreck-It Ralph',
            skins: [
                { id: 'Ralph_Default' },
                // { id: '253' },
                // { id: '259' },
                // { id: '265' },
                // { id: '271' },
                // { id: '277' },
                // { id: '283' },
            ],
        },
        {
            racerId: 'Calhoun',
            name: 'Sergeant Calhoun',
            skins: [
                { id: 'Calhoun_Default' },
                // { id: '289' },
                // { id: '295' },
                // { id: '301' },
                // { id: '307' },
                // { id: '313' },
                // { id: '319' },
            ],
        },
    ];

    private static rarities: string[] = ['HR', 'SER', 'SRR', 'SR', 'R', 'N'];

    static generateCreateCardDto(): CreateCardDto {
        const randomCard = this.cards[Math.floor(Math.random() * this.cards.length)] as CardInfo;
        const dto: CreateCardDto = {
            name: randomCard.name,
            racerId: randomCard.racerId,
            rarity: this.rarities[Math.floor(Math.random() * this.rarities.length)] as string,
            experience: 0,
            level: 1,
            unlockedSkins: [(randomCard.skins[Math.floor(Math.random()) * randomCard.skins.length] as Skin).id],
        };

        return dto;
    }
}

interface CardInfo {
    racerId: string;
    name: string;
    skins: Skin[];
}

interface Skin {
    id: string;
}
