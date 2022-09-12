import {DTreeNodeType} from "./DecisionTreeRule";

export class DecisionTreeDebug {
    nodeId: string | number;
    evaluationResult: boolean;
    text?: string;
    inputProperty?: string;
    inputValue?: any;
    value?: any;
    operator?: string;
    type: DTreeNodeType;
}
