import { SolverStrategy } from '../enums/SolverStrategies';
import { GeoLocation } from '../enums/GeoLocations';
import { CustomDomain } from '../CustomDomain';
export declare class DecisionRulesConfigModel {
    authKey: string;
    strategy: SolverStrategy;
    geoLoc: GeoLocation;
    customDomain?: CustomDomain;
}
