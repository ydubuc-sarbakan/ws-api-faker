export class GetPlayerDto {
    readonly roleId: string;

    constructor(roleId: string) {
        this.roleId = roleId;
    }
}
