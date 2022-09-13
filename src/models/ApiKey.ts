export class ApiKey {
    id: string;
    key: string;
    created: Date;
    type: ApiKeyType;
    name?: string;
    space: string;
}

export enum ApiKeyType {
    SOLVER = 'SOLVER',
    MANAGEMENT = 'MANAGEMENT',
    BI = 'BI'
}
