/***
 * Base model for DTreeNode and Cell.
 */
import {Models} from "./Rule";
import {DTreeNode} from "./DecisionTreeRule";
import ScalarCondition = Models.ScalarCondition;
import CellType = Models.CellType;
import OutputScalarValue = Models.OutputScalarValue;


export class DecisionNodeBase {
    scalarCondition?: ScalarCondition;
    outputScalarValue?: OutputScalarValue;
    type: DTreeNode | CellType | string;
}
