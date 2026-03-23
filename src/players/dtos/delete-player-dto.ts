export class DeletePlayerDto {
    readonly roleId: string;

    constructor(roleId: string) {
        this.roleId = roleId;
    }
}
