import { Protocol, SolverMode, RuleStrategy } from "./Enums"

export type HttpHeader = {
    'Authorization': string, 
    'Content-Type': string, 
    'X-Strategy'?: string
}

export type ManagementConfig = {
    
}

export type CustomDomain = {
    domainName: string,
    protocol: Protocol
}

export type UrlData = {
    mode: SolverMode,
    ruleId: string,
    version?: number | string
}