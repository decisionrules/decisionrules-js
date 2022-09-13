/***
 * Decision Tree Frontend Model
 */
import {RuleBase} from "./RuleBase";
import {BaseType} from "./DecisionBase";
import {Models} from "./Rule";
import ScalarCondition = Models.ScalarCondition;
import Cell = Models.Cell;

export class DecisionTreeRule extends RuleBase {
    nodes?: DTreeNode[];

    constructor() {
        super();
        this.type = BaseType.DecisionTree;
    }
}

export class DTreeNode extends Cell {

    id: string
    type: DTreeNodeType;
    nodes: DTreeNode[];
    modelVariablePath?: string;
    scalarCondition?: ScalarCondition;
    result?: boolean
    logs: any;
}

export enum DTreeNodeType {
    IF_STATEMENT = 'if',
    ELSE = 'else',
    THEN = 'then',
    CONDITION = 'condition',
    RESULT = 'result',
    LOGIC_OR = 'logic_or',
    LOGIC_GROUP = 'logic_group'
}
