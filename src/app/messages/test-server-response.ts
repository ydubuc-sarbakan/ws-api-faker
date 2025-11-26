import { AppServerResponse } from '../types/app-server-response.js';

export class TestServerResponse extends AppServerResponse {
    static readonly ACTION: string = 'test';

    readonly stringValue: string;
    readonly stringArray: string[];
    readonly intValue: number;
    readonly intArray: number[];
    readonly floatValue: number;
    readonly floatArray: number[];
    readonly boolValue: boolean;
    readonly boolArray: boolean[];

    constructor(
        stringValue: string,
        stringArray: string[],
        intValue: number,
        intArray: number[],
        floatValue: number,
        floatArray: number[],
        boolValue: boolean,
        boolArray: boolean[],
    ) {
        super(TestServerResponse.ACTION);
        this.stringValue = stringValue;
        this.stringArray = stringArray;
        this.intValue = intValue;
        this.intArray = intArray;
        this.floatValue = floatValue;
        this.floatArray = floatArray;
        this.boolValue = boolValue;
        this.boolArray = boolArray;
    }
}
