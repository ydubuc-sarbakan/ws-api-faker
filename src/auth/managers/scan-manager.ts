export class ScanManager {
    private static instance: ScanManager | null = null;
    public static Instance(): ScanManager {
        if (this.instance === null) {
            this.instance = new ScanManager();
        }
        return this.instance;
    }

    pendingQrScans: Map<string, WebSocket> = new Map();

    private constructor() {
        // init
    }

    getScan(machineId: string): WebSocket | undefined {
        return this.pendingQrScans.get(machineId);
    }

    addScan(machineId: string, socket: WebSocket): void {
        this.pendingQrScans.set(machineId, socket);
    }

    removeScan(machineId: string): void {
        this.pendingQrScans.delete(machineId);
    }
}
