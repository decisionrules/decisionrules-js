import {BaseType} from './DecisionBase';
import {Models} from "./Rule";
import {RuleBase} from "./RuleBase";
import DecisionTable = Models.DecisionTable;

export class DecisionTableRule extends RuleBase {
    type: BaseType.DecisionTable;
    decisionTable: DecisionTable;
}
