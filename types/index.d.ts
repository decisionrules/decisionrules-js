export var __esModule: boolean;
export class Solver {
    constructor(apiKey: any, geoLoc: any);
    baseUrl: string;
    api_key: any;
    geoLoc: any;
    solver(ruleId: any, inputData: any, version: any): any;
    urlFactory(ruleId: any, version: any): string;
    inputDataParser(inputData: any): {
        data: any;
    };
}
