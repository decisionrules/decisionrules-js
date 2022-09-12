import {BaseType} from './DecisionBase';
import {Models} from "./rule.model";
import {RuleBase} from "./RuleBase.model";
import DecisionTable = Models.DecisionTable;

export class DecisionTableRule extends RuleBase {
    type: BaseType.DecisionTable;
    decisionTable: DecisionTable;
}
