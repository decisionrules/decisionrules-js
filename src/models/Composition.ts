import {BaseType, DecisionBase} from './DecisionBase';

export class Composition extends DecisionBase {
    compositionId?: string;
    visualEditorData: any;
    type: BaseType.Composition;
    dataTree?: IDataTree;
    rules?: {id: string, version?: number}[]
}

export interface ITreeMapping {
    key: string;
    source: string;
    sourceVariable: string;
}

export interface IDataTree {
    baseId?: string;
    globalVariable?: string;
    children?: IDataTree[];
    version?: number;
    mapping?: ITreeMapping[];
    visited?: boolean;
}
