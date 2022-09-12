import {DecisionNodeBase} from "./DecisionNodeBase";
import {DTreeNode} from "./DecisionTreeRule";

export module Models {

    export type AuditFlag = {
        active?: boolean,
        ttl?: number;
        debug?: DebugFlag
    }

    export type DebugFlag = {
        active?: boolean;
    }

    export class Attr {
        name: string;
        type: string;
        attr?: Attr[];
    }

    export class Condition {
        name: string;
        type: string;
        inputVariable: string;
    }

    export class ColumnOutput {
        name: string;
        type: string;
        outputVariable: string;
    }

    export class Column {
        columnId: number;
        type: ColumnType | string;
        condition?: Condition;
        columnOutput?: ColumnOutput;
    }

    export class ScalarCondition {
        operator: string;
        type?: ScalarConditionType | any;
        value: any;
    }

    export class ScalarConditionValueDate {
        date: any;
        time: any;
        timezone: any;
    }

    export enum ScalarConditionType {
        GENERAL = 'general', DATE = 'date', FUNCTION = 'function'
    }

    export class OutputScalarValue {
        value: any;
        type?: OutputScalarType | any;
    }

    export enum OutputScalarType {
        COMMON = 'common', FUNCTION = 'function'
    }

    export class Cell extends DecisionNodeBase{
        column: number;
    }

    export class Row {
        cells: Cell[];
        active: boolean;
        result?: boolean;
        timeValidation?: TimeValidation;
    }

    export class TimeValidation{
        from: ScalarConditionValueDate;
        to: ScalarConditionValueDate;
    }

    export class DecisionTable {
        columns: Column[];
        rows: Row[];
    }

    export class RenameGroupModel {
        baseId: string;
        name: string;
    }

    export enum CellType {
        Input = "input",
        Output = "output"
    }

    export enum ColumnType {
        Input = "input",
        Output = "output"
    }

    export class NewHistory {
        ruleId: string;
        version: number;
        userId: string;
        userEmail: string;
        script?: string;
        table?: DecisionTable;
        time: string;
        decisionTreeNodes?: DTreeNode[];
    }

    export class DbHistory {
        ruleId: string;
        version: number;
        history: HistoryModel[];
    }

    export class HistoryModel {
        userId: string;
        userEmail: string;
        script?: string;
        table?: any;
        time: string;
        version: number;
        decisionTreeNodes?: DTreeNode[];

    }

    export enum ScalarOperators {
        Equals = '=',
        IsIn = 'IN',
        IsNotIn = 'NOT IN',
        LowerThanOrEqual = '<=',
        LowerThan = '<',
        HigherThanOrEqual = '>=',
        HigherThan = '>',
        NotEqual = '<>',
        Between = 'between',
        BetweenLeftOpen = 'betweenLeftOpen',
        BetweenRightOpen = 'betweenRightOpen',
        NotBetween = 'notBetween',
        Anything = 'anything',
        ContainsText = 'containsText',
        ContainsIn = 'containsIn',
        NotContainsIn = 'notContainsIn',
        EqualArray = 'equalArray',
        Function = 'function',
        IsNull = 'isNull',
        IsNotNull = 'isNotNull'
    }
}

