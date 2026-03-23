export class AuthService {
    async generateQrCodeUrl(machineId: string): Promise<string> {
        return `https://api.qrserver.com/v1/create-qr-code/?size=768x768&data=http://192.168.7.57:9002?machineId=${encodeURIComponent(machineId)}`;
    }
}
