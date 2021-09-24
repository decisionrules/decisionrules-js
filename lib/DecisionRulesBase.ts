import {SolverStrategy} from './enums/SolverStrategies';
import {GeoLocation} from './enums/GeoLocations';
import {SolverTypes} from './enums/SolverTypes';
import {CustomDomain} from './CustomDomain';
import {DecisionRulesConfigModel} from './models/Models';

export class DecisionRulesBase {

    protected solverConfig: DecisionRulesConfigModel;

    constructor(config: DecisionRulesConfigModel) {
        this.solverConfig = {...config};
    }

    protected headerFactory(authKey: string, strategy: SolverStrategy) {
        if (strategy === SolverStrategy.STANDARD) {
            return {Authorization: `Bearer ${this.solverConfig.authKey}`, 'Content-Type': 'application/json'};
        } else {
            return {Authorization: `Bearer ${this.solverConfig.authKey}`, 'Content-Type': 'application/json', 'X-Strategy': this.solverConfig.strategy};
        }
    }

    protected solverUrlFactory(geoLoc: GeoLocation, solverType: SolverTypes, customDomain?: CustomDomain) {
        let url;
        if (customDomain) {
            url = `${customDomain.protocol}://${customDomain.domain}/${solverType}/solve/`;
        } else {
            url = `https://${geoLoc}.decisionrules.io/${solverType}/solve/`;
        }
        return url;
    }
}
