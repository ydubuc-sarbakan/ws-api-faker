import { ScanManager } from './managers/scan-manager.js';

export class AuthService {
    async generateQrCodeUrl(machineId: string, socket: WebSocket): Promise<string> {
        ScanManager.Instance().addScan(machineId, socket);
        return `https://api.qrserver.com/v1/create-qr-code/?size=768x768&data=http://192.168.50.36:9003/auth/scan?machineId=${encodeURIComponent(machineId)}`;
    }
}
