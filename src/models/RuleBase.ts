import {BaseType, DecisionBase, UserVariable} from "./DecisionBase";

export class RuleBase extends DecisionBase {
    ruleId: string;
    type: BaseType;
    userVariables?: UserVariable[];
}
