import {Models} from "./Rule";
import AuditFlag = Models.AuditFlag;

export class DecisionBase {
    name: string;
    description?: string;
    inputSchema: any;
    outputSchema: any;
    version?: number;
    lastUpdate?: Date;
    createdIn?: Date;
    status: BaseStatus;
    baseId?: string;
    type: BaseType;
    tags?: string[];
    auditLog?: AuditFlag
}

export enum BaseStatus {
    Published = 'published',
    Pending = 'pending'
}

export enum BaseType {
    DecisionTable = 'decision-table',
    ComplexRule = 'complex-rule',
    Composition = 'composition',
    DecisionTree = 'decision-tree'
}

export class UserVariable {
    name: string;
    value: any;
    // meta data part
}
