import axios from 'axios';

export enum GeoLocation {
    EU1='eu1',
    EU2='eu2',
    US1='us1',
    US2='us2',
    DEFAULT='default'
}

export enum SolverStrategy {
    STANDARD = 'STANDARD',
    ARRAY = 'ARRAY',
    FIRST_MATCH = 'FIRST_MATCH'
}

export enum ProtocolsEnum {
    HTTP = 'http',
    HTTPS = 'https'
}

export class CustomDomain {
    private customDomainUrl: string;
    private customDomainProtocol: ProtocolsEnum;

    constructor(customDomainUrl: string, customDomainProtocol: ProtocolsEnum) {
        this.customDomainUrl = customDomainUrl;
        this.customDomainProtocol = customDomainProtocol;
    }

    public getCustomDomainUrl(): string {
        return this.customDomainUrl;
    }

    public getCustomDomainProtocol(): ProtocolsEnum {
        return this.customDomainProtocol;
    }
}

export class Solver{
    private api_key: string;
    private geoLoc: GeoLocation | undefined = GeoLocation.DEFAULT;
    private customBaseUrl: CustomDomain | undefined;

    private readonly baseUrl: string = "api.decisionrules.io/rule/solve";

    constructor(apiKey: string, geoLoc?: GeoLocation, customDomain?: CustomDomain) {
        this.api_key = apiKey;
        this.geoLoc = geoLoc;
        this.customBaseUrl = customDomain
    }

    solver(ruleId: any, inputData: any, strategy: SolverStrategy, version?: string): Promise<any>
    
    solver<T>(ruleId:any, inputData: any, strategy: SolverStrategy, version?: string): Promise<T>;
    
    solver(ruleId: any, inputData: any, strategy: SolverStrategy, version?: string): Promise<any> {
        const endpoint = this.urlFactory(ruleId, this.customBaseUrl, version);

        const header = this.headerFactory(this.api_key, strategy);

        return new Promise<any>(((resolve, reject) => {
            axios.post(endpoint, this.inputDataParser(inputData), {headers: header}).then(r => {
                resolve(r.data);
            }).catch(error => {
                if (error.response) {
                    reject(`Call ended with ${error.response.status}`);
                } else if (error.request) {
                    reject("The request was made but not response was received");
                } else {
                    reject(`Error: ${error.message}`);
                }
            })
        }));
    }
    
    private urlFactory(ruleId: string, customDomain?: CustomDomain, version?: string): string {
        let url;

        if (customDomain) {
            url = `${customDomain.getCustomDomainProtocol()}://${customDomain.getCustomDomainUrl()}/rule/solve/`
        } else {
            if (this.geoLoc === GeoLocation.DEFAULT) {
                url = `https://${this.baseUrl}/`;
            } else {
                url = `https://${this.geoLoc}.${this.baseUrl}/`;
            }
        }

        if (version != null) {
            url += ruleId;
        } else {
            url += `${ruleId}/${version}`;
        }
        
        return url;
    }

    private inputDataParser(inputData: any): object{
        return {
            data: JSON.parse(JSON.stringify(inputData))
        }
    }

    private headerFactory(apikey: string, strategy: SolverStrategy): object{
        if (strategy === SolverStrategy.STANDARD){
            return {Authorization: `Bearer ${this.api_key}`, 'Content-Type': 'application/json'}
        } else {
            return {Authorization: `Bearer ${this.api_key}`, 'Content-Type': 'application/json', 'X-Strategy': strategy}
        }
    }
}
