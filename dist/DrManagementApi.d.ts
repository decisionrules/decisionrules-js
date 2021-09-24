import { DecisionRulesBase } from './DecisionRulesBase';
import { DecisionRulesConfigModel } from './models/Models';
export declare class DrManagementApi extends DecisionRulesBase {
    constructor(config: DecisionRulesConfigModel);
    private url;
    private headers;
    private getApiCall;
    getRuleById(ruleId: string): Promise<any>;
    getRuleByIdAndVersion(ruleId: string, version: string): Promise<any>;
    getSpace(spaceId: string): Promise<any>;
    postRuleForSpace(spaceId: string, data: any): Promise<any>;
    putRule(ruleId: string, version: string, data: any): Promise<any>;
    deleteRule(ruleId: string, version: string): Promise<any>;
}
