import { RuleStrategy } from "./Enums";
import { HttpHeader } from "./Types";

export class HeaderContext{

    private header: ApiHeader;

    constructor(header: ApiHeader) {
        this.header = header;
    }

    public createHeader(key: string, strategy?: RuleStrategy): HttpHeader {
        return this.header.createHeader(key, strategy);
    }

}

interface ApiHeader {
    createHeader(key: string, strategy?: RuleStrategy): HttpHeader;
}

export class SolverHeader implements ApiHeader{

    public createHeader(apiKey: string, strategy?: RuleStrategy): HttpHeader  {
    
        if (strategy) {
            return {
                Authorization: `Bearer ${apiKey}`,
                "X-Strategy": strategy,
                "Content-Type": 'application/json'
            }
            
        }

        return {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": 'application/json'
        }
    }

}

export class ManagementHeader implements ApiHeader {

    public createHeader(managementKey: string): HttpHeader {

        return {
            Authorization: `Bearer ${managementKey}`,
            "Content-Type": 'application/json'
        }
    }

}