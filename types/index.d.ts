export declare class Solver {
    private api_key;
    private geoLoc;
    private readonly baseUrl;
    constructor(apiKey: string, geoLoc?: string);
    solver<T>(ruleId: any, inputData: any, version?: string): Promise<T>;
    private urlFactory;
    private inputDataParser;
}
