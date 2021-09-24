import {SolverStrategy} from '../enums/SolverStrategies';
import {GeoLocation} from '../enums/GeoLocations';
import {CustomDomain} from '../CustomDomain';

export class DecisionRulesConfigModel{
    // @ts-ignore
    authKey: string;
    // @ts-ignore
    strategy: SolverStrategy;
    // @ts-ignore
    geoLoc: GeoLocation;
    // @ts-ignore
    customDomain?: CustomDomain;
    // @ts-ignore
    publicAuthKey?: string;
}
