import { SolverStrategy } from './enums/SolverStrategies';
import { GeoLocation } from './enums/GeoLocations';
import { SolverTypes } from './enums/SolverTypes';
import { CustomDomain } from './CustomDomain';
import { DecisionRulesConfigModel } from './models/Models';
export declare class DecisionRulesBase {
    protected solverConfig: DecisionRulesConfigModel;
    constructor(config: DecisionRulesConfigModel);
    protected headerFactory(authKey: string, strategy: SolverStrategy): {
        Authorization: string;
        'Content-Type': string;
        'X-Strategy'?: undefined;
    } | {
        Authorization: string;
        'Content-Type': string;
        'X-Strategy': SolverStrategy;
    };
    protected solverUrlFactory(geoLoc: GeoLocation, solverType: SolverTypes, customDomain?: CustomDomain): string;
}
