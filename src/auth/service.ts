export class AuthService {
    async generateQrCodeUrl(machineId: string): Promise<string> {
        return (
            'https://upload.wikimedia.org/wikipedia/commons/3/31/MM_QRcode.png?machineId=' +
            encodeURIComponent(machineId)
        );
    }
}
