import {DecisionRulesBase} from './DecisionRulesBase';
import {DecisionRulesConfigModel} from './models/Models';
import {SolverTypes} from './enums/SolverTypes';
import axios from 'axios';

export class Solver extends DecisionRulesBase {

    constructor(config: DecisionRulesConfigModel) {
        super(config);
    }

    public solver(solverType: SolverTypes, data: any, ruleId: string, version?: string) {
        const header = this.headerFactory(this.solverConfig.authKey, this.solverConfig.strategy);
        let apiUrl = this.solverUrlFactory(this.solverConfig.geoLoc, solverType, this.solverConfig.customDomain);

        if (version) {
            apiUrl += `${ruleId}/${version}`;
        } else {
            apiUrl += `${ruleId}`;
        }



        return axios.post(apiUrl, data, {headers: header}).then(response => {
            return response.data;
        }).catch(error => {
            console.error(error);
        });
    }
}
