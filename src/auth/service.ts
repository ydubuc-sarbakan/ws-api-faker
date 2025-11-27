export class AuthService {
    async generateQrCodeUrl(machineId: string): Promise<string> {
        return 'https://example.com/qr-code?machineId=' + encodeURIComponent(machineId);
    }
}
