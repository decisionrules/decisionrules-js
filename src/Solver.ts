import axios from "axios";
import { CustomDomain } from "./Types";
import { HeaderContext, SolverHeader } from "./Header";
import { HttpHeader } from "./Types";
import { SolverUrl, UrlContext } from "./Url";
import {SolverMode, RuleStrategy, RuleFlowStrategy, Protocol} from "./Enums";

export class Solver{

    private readonly customDomain: CustomDomain;
    private readonly apiKey: string

    constructor(apiKey: string, customDomain?: CustomDomain) {
        this.apiKey = apiKey;
        this.customDomain = customDomain ?? {domainName: "api.decisionrules.io", protocol: Protocol.HTTPS, port: 443};
    }

    public async solveRule(ruleId: string, data: object, version?: number | "latest", strategy?: RuleStrategy, correlationId?: string) {
        let urlData = {version, mode: SolverMode.RULE, ruleId};
        const header: HttpHeader = new HeaderContext(new SolverHeader()).createHeader(this.apiKey, strategy, correlationId);
        const url: string = new UrlContext(new SolverUrl()).createUrl(urlData, this.customDomain);
        const response = await axios.post(url, this.transformRequestData(data), {headers: header});
        return response.data;
    }

    public async solveRuleFlow(ruleId: string, data: object, version?: number | "latest", strategy?: RuleFlowStrategy, correlationId?: string) {
        let urlData = {version, mode: SolverMode.RULEFLOW, ruleId};
        const url: string = new UrlContext(new SolverUrl()).createUrl(urlData, this.customDomain);
        const header: HttpHeader = new HeaderContext(new SolverHeader()).createHeader(this.apiKey, strategy, correlationId);
        const response = await axios.post(url, this.transformRequestData(data), {headers: header});
        return response.data;
    }

    private transformRequestData(request: object): object {
        if (request.hasOwnProperty("data")){
            return request;
        }
        return {data: request};
    }
}