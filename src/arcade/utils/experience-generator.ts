export class ExperienceGenerator {
    static giveExperienceForRacePosition(position: number): number {
        switch (position) {
            case 1:
                return 100;
            case 2:
                return 75;
            case 3:
                return 50;
            case 4:
                return 25;
            default:
                return 10;
        }
    }

    static giveExperienceForCupPosition(position: number): number {
        switch (position) {
            case 1:
                return 500;
            case 2:
                return 300;
            case 3:
                return 200;
            case 4:
                return 100;
            default:
                return 50;
        }
    }
}
