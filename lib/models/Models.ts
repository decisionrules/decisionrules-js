import {SolverStrategy} from '../enums/SolverStrategies';
import {GeoLocation} from '../enums/GeoLocations';
import {CustomDomain} from '../CustomDomain';

/*
* DecisionRules init config model.
*
* @param authKey - API key string
* @param strategy - Solver strategy
* @param geoLoc - Geolocation for API
* @param customDomain - Custom domain URL
* @param publicAuthKey - Management API key
*
*/
export interface DecisionRulesConfigModel{
    authKey: string;
    strategy: SolverStrategy;
    geoLoc?: GeoLocation;
    customDomain?: CustomDomain;
    publicAuthKey?: string;
}