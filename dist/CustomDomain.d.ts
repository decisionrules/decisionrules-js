import { Protocols } from './enums/Protocols';
export declare class CustomDomain {
    private _protocol;
    private _domain;
    constructor(protocol: Protocols, domain: string);
    get protocol(): Protocols;
    set protocol(value: Protocols);
    get domain(): string;
    set domain(value: string);
}
