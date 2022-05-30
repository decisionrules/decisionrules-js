import { Protocol, SolverMode } from "./Enums"

export type HttpHeader = {
    'Authorization': string, 
    'Content-Type': string, 
    'X-Strategy'?: string
}

export type CustomDomain = {
    domainName: string,
    protocol: Protocol,
    port: number
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