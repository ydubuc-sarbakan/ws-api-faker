import { AppClientRequest } from '../types/app-client-response.js';

export class TestClientRequest extends AppClientRequest {
    static readonly ACTION: string = 'test';

    readonly stringValue: string = '';
    readonly stringArray: string[] = [];
    readonly intValue: number = 0;
    readonly intArray: number[] = [];
    readonly floatValue: number = 0.0;
    readonly floatArray: number[] = [];
    readonly boolValue: boolean = false;
    readonly boolArray: boolean[] = [];
}
