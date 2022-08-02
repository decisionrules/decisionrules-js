import { baseUrl } from "./Constants";
import { CustomDomain, UrlData } from "./Types"


export class UrlContext {
    private url: Url;
    constructor(url: Url) {
        this.url = url;
    }
    public createUrl(data?: UrlData, domain?: CustomDomain): string{
        return this.url.createUrl(data, domain);
    }
}

export interface Url {
    createUrl(data?: UrlData, domain?: CustomDomain): string;
}

export class SolverUrl implements Url  {
    public createUrl(data: UrlData, domain?: CustomDomain): string {
        if (isNaN(Number(data.version)) && data.version !== 'latest' && data.version !== undefined) {
            throw Error('Version is not a valid integer or "latest"');
        }
        const prefix = `/${data.mode}/solve`
        let url: string;
        if (domain) {
            url = `${domain.protocol}://${domain.domainName}:${domain.port}${prefix}/${data.ruleId}`
        } else {
            url = baseUrl + prefix;
        }
        if (data.version) {
            if (data.version !== 'latest') {
                url += `/${Number(data.version)}`;
            }
        }
        return url;
    }
}

export class ManagementUrl implements Url {
    createUrl(data: UrlData, domain: CustomDomain): string {
        const prefix = `/api`
        let url: string;
        if (domain) {
            url = `${domain.protocol}://${domain.domainName}:${domain.port}${prefix}`
        } else {
            url = baseUrl + prefix;
        }
        return url;
    }
    
}