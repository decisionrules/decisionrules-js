export enum RuleStrategy{
    STANDARD = 'STANDARD',
    ARRAY = 'ARRAY',
    FIRST_MATCH = 'FIRST_MATCH',
    EVALUATE_ALL = "EVALUATE_ALL"
}

export enum RuleFlowStrategy{
    STANDARD = 'STANDARD',
    ARRAY = 'ARRAY',
    FIRST_MATCH = 'FIRST_MATCH'
}

export enum Protocol{
    HTTP = 'http',
    HTTPS = 'https'
}

export enum SolverMode{
    RULE = 'rule',
    RULEFLOW = 'composition'
}