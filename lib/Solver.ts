import {DecisionRulesBase} from './DecisionRulesBase';
import {DecisionRulesConfigModel} from './models/Models';
import {SolverTypes} from './enums/SolverTypes';
import axios from 'axios';

export class Solver extends DecisionRulesBase {

    constructor(config: DecisionRulesConfigModel) {
        super(config);
    }

    /*
    * Solves decision rule or composition.
    *
    * @param solverType - Type of solver is defined in SolverTypes enum. Other values are not allowed.
    * @param data - input object of rule/composition I/O model.
    * @param id - Id of rule or composition
    * @param version - Rule version or composition version.
    *
    * @return - populated output model with solved values as promise.
    * */
    public solver(solverType: SolverTypes, data: any, id: string, version?: string) {
        const header = this.solverHeaderFactory();
        let apiUrl = this.solverUrlFactory(solverType);

        if (version) {
            apiUrl += `${id}/${version}`;
        } else {
            apiUrl += `${id}`;
        }

        return axios.post(apiUrl, data, {headers: header}).then(response => {
            return response.data;
        }).catch(error => {
            console.error(error);
        });
    }
}
