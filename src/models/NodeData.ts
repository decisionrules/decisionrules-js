export class NodeData {
    type: NodeType
    ruleId: string
    /**
     * rule version number OR -1 if latest is selected
     */
    ruleVersion: number;
    globalVariable: string;
}

export enum NodeType{
    NODE = 'node',
    START = 'start',
    END = 'end'
}
