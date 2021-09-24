import { DecisionRulesBase } from './DecisionRulesBase';
import { DecisionRulesConfigModel } from './models/Models';
import { SolverTypes } from './enums/SolverTypes';
export declare class Solver extends DecisionRulesBase {
    constructor(config: DecisionRulesConfigModel);
    solver(solverType: SolverTypes, data: any, id: string, version?: string): Promise<any>;
}
