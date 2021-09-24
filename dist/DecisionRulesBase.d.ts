import { SolverStrategy } from './enums/SolverStrategies';
import { SolverTypes } from './enums/SolverTypes';
import { DecisionRulesConfigModel } from './models/Models';
export declare class DecisionRulesBase {
    protected solverConfig: DecisionRulesConfigModel;
    constructor(config: DecisionRulesConfigModel);
    protected solverHeaderFactory(): {
        Authorization: string;
        'Content-Type': string;
        'X-Strategy'?: undefined;
    } | {
        Authorization: string;
        'Content-Type': string;
        'X-Strategy': SolverStrategy.ARRAY | SolverStrategy.FIRST_MATCH;
    };
    protected publicApiHeaderFactory(): {
        Authorization: string;
        'Content-Type': string;
    };
    protected solverUrlFactory(solverType: SolverTypes): string;
    protected crudUrlFactory(): string;
}
