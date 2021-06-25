export declare enum GeoLocation {
    EU1 = "eu1",
    EU2 = "eu2",
    US1 = "us1",
    US2 = "us2",
    DEFAULT = "default"
}
export declare enum SolverStrategy {
    STANDARD = "STANDARD",
    ARRAY = "ARRAY",
    FIRST_MATCH = "FIRST_MATCH"
}
export declare class Solver {
    private api_key;
    private geoLoc;
    private readonly baseUrl;
    constructor(apiKey: string, geoLoc?: GeoLocation);
    solver(ruleId: any, inputData: any, strategy: SolverStrategy, version?: string): Promise<any>;
    solver<T>(ruleId: any, inputData: any, strategy: SolverStrategy, version?: string): Promise<T>;
    private urlFactory;
    private inputDataParser;
    private headerFactory;
}
