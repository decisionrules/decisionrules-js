import {SolverStrategy} from './enums/SolverStrategies';
import {SolverTypes} from './enums/SolverTypes';
import {DecisionRulesConfigModel} from './models/Models';

export class DecisionRulesBase {

    protected solverConfig: DecisionRulesConfigModel;

    constructor(config: DecisionRulesConfigModel) {
        this.solverConfig = {...config};
    }

    protected solverHeaderFactory() {
        if (this.solverConfig.strategy === SolverStrategy.STANDARD) {
            return {Authorization: `Bearer ${this.solverConfig.authKey}`, 'Content-Type': 'application/json'};
        } else {
            return {Authorization: `Bearer ${this.solverConfig.authKey}`, 'Content-Type': 'application/json', 'X-Strategy': this.solverConfig.strategy};
        }
    }

    protected publicApiHeaderFactory() {
        return {Authorization: `Bearer ${this.solverConfig.publicAuthKey}`, 'Content-Type': 'application/json'};
    }

    protected solverUrlFactory(solverType: SolverTypes) {
        let url;
        if (this.solverConfig.customDomain) {
            url = `${this.solverConfig.customDomain.protocol}://${this.solverConfig.customDomain.domain}/${solverType}/solve/`;
        } else {
            url = `https://${this.solverConfig.geoLoc}.decisionrules.io/${solverType}/solve/`;
        }
        return url;
    }

    protected crudUrlFactory(){
        let url;
        if (this.solverConfig.customDomain) {
            url = `${this.solverConfig.customDomain.protocol}://${this.solverConfig.customDomain.domain}/api/`
        } else {
            url = `https://${this.solverConfig.geoLoc}.decisionrules.io/api/`;
        }
        return url;
    }
}
