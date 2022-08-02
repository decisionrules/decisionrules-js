import {RuleFlowStrategy, RuleStrategy} from "./Enums";
import { HttpHeader } from "./Types";

export class HeaderContext {

    private header: ApiHeader;

    constructor(header: ApiHeader) {
        this.header = header;
    }

    public createHeader(key: string, strategy?: RuleStrategy | RuleFlowStrategy, correlationId?: string): HttpHeader {
        return this.header.createHeader(key, strategy, correlationId);
    }
}

interface ApiHeader {
    createHeader(key: string, strategy?: RuleStrategy | RuleFlowStrategy, correlationId?: string): HttpHeader;
}

export class SolverHeader implements ApiHeader{
    public createHeader(apiKey: string, strategy?: RuleStrategy | RuleFlowStrategy, correlationId?: string): HttpHeader  {
        const header: any = {'Content-Type': 'application/json'};
        if (apiKey) { header['Authorization'] = `Bearer ${apiKey}`; } else {
            throw new Error('Solver API key is required');
        }
        if (strategy) { header['X-Strategy'] = strategy; }
        if (correlationId) { header['X-Correlation-Id'] = correlationId; }
        return header;
    }
}

export class ManagementHeader implements ApiHeader {
    public createHeader(managementKey: string): HttpHeader {
        if (!managementKey) {
            throw new Error('Management API key is required');
        }
        return {
            Authorization: `Bearer ${managementKey}`,
            "Content-Type": 'application/json'
        }
    }
}