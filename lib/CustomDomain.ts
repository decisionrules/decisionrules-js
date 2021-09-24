import {Protocols} from './enums/Protocols';

export class CustomDomain {
    private _protocol: Protocols;
    private _domain: string;

    constructor(protocol: Protocols, domain: string) {
        this._protocol = protocol;
        this._domain = domain;
    }


    get protocol(): Protocols {
        return this._protocol;
    }

    set protocol(value: Protocols) {
        this._protocol = value;
    }

    get domain(): string {
        return this._domain;
    }

    set domain(value: string) {
        this._domain = value;
    }
}
