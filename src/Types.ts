import { Protocol, SolverMode } from "./Enums"

export type HttpHeader = {
    'Authorization': string, 
    'Content-Type': string, 
    'X-Strategy'?: string
}

export abstract class CustomDomain {
    public domainName: string;
    public protocol: Protocol;
    public port: number;

    constructor(domainName: string, protocol: Protocol, port: number){
        this.domainName = domainName;
        this.protocol = protocol;
        this.port = port;
    }
}

export type UrlData = {
    mode: SolverMode,
    ruleId: string,
    version?: number | string
}

export type Tag = {
    tagName: string,
    color: string | 'default'
}