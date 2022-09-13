import {Models} from "./Rule";
import ScalarCondition = Models.ScalarCondition;

export class DecisionTableDebug {
    rowNumber: number;
    conditions: ScalarConditionDebug[];
    evaluationResult?: boolean;
    text?: string;
}

export class ScalarConditionDebug extends ScalarCondition{
    columnId?: string | number;
    inputProperty: string;
    inputValue: any;
    evaluationResult: boolean;
    evaluationError: string
}
