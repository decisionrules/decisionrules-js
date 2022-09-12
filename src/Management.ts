import {HeaderContext, ManagementHeader} from "./Header";
import {CustomDomain, HttpHeader} from "./Types";
import {ManagementUrl, UrlContext} from "./Url";
import axios from "axios";
import {Protocol} from "./Enums";
import {DecisionTableRule} from "./models/DecisionTableRule";
import {DecisionTreeRule} from "./models/DecisionTreeRule";
import {ScriptRule} from "./models/ScriptRule";
import {RuleFlow} from "./models/RuleFlow";
import {Tag} from "./models/tag.model";

export class Management {
    private readonly apikey: string;
    private readonly customDomain: CustomDomain;
    private readonly header: HttpHeader;
    private readonly urlBase: string;

    constructor(managementKey: string, customDomain?: CustomDomain) {
        this.apikey = managementKey;
        this.customDomain = customDomain ?? {domainName: "api.decisionrules.io", protocol: Protocol.HTTPS, port: 443};
        this.header = new HeaderContext(new ManagementHeader()).createHeader(this.apikey);
        this.urlBase = new UrlContext(new ManagementUrl).createUrl(undefined, this.customDomain);
    }

    /**
     * Returns rule by ruleId and version.
     *
     * @param ruleId
     * @param version
     *
     * @returns rule
     */
    public async getRule(ruleId: string, version?: number): Promise<DecisionTableRule | DecisionTreeRule | ScriptRule> {

        let url: string;

        if (version) {
            url =  `${this.urlBase}/rule/${ruleId}/${version}`;
        } else {
            url =  `${this.urlBase}/rule/${ruleId}/`;
        }

        const response = await axios.get(url, {headers: this.header});

        return response.data;

    }

    /**
     * Returns all rules including Rule Flows present in space that belongs to management API key.
     *
     */
    public async getSpaceItems(): Promise<(DecisionTableRule | DecisionTreeRule | ScriptRule | RuleFlow)[]> {

        const url: string = `${this.urlBase}/space/items`;

        const response = await axios.get(url, {headers: this.header});

        return response.data;

    }

    /**
     * Creates rule in space.
     *
     * @param rule
     */
    public async createRule(rule: DecisionTableRule | DecisionTreeRule | ScriptRule): Promise<DecisionTableRule | DecisionTreeRule | ScriptRule> {

        const url: string = `${this.urlBase}/rule/`;

        const response = await axios.post(url, rule, {headers: this.header});

        return response.data;

    }

    /**
     * Updates rule that is in space.
     *
     * @param ruleId
     * @param rule
     * @param version
     */
    public async updateRule(ruleId: string, rule: DecisionTableRule | DecisionTreeRule | ScriptRule,  version: number): Promise<number> {

        const url = `${this.urlBase}/rule/${ruleId}/${version}`

        const response = await axios.put(url, rule, {headers: this.header});

        return response.status;

    }

    /**
     * Deletes rule from space.
     *
     * @param ruleId
     * @param version
     */
    public async deleteRule(ruleId: string, version: number): Promise<number> {

        const url = `${this.urlBase}/rule/${ruleId}/${version}`
        
        const response = await axios.delete(url, {headers: this.header});

        return response.status;
    }

    /**
     * Returns RuleFlow by ruleId or version.
     *
     * @param ruleId
     * @param version
     */
    public async getRuleFlow(ruleId: string, version?: number): Promise<RuleFlow> {
        let url: string;

        if (version) {
            url =  `${this.urlBase}/rule-flow/${ruleId}/${version}`;
        } else {
            url =  `${this.urlBase}/rule-flow/${ruleId}/`;
        }

        const response = await axios.get(url, {headers: this.header});

        return response.data;
    }

    /**
     * Creates RuleFlow in space.
     *
     * @param ruleFlow
     */
    public async createRuleFlow(ruleFlow: RuleFlow): Promise<RuleFlow> {
        const url: string =  `${this.urlBase}/rule-flow/`;

        const response = await axios.post(url, ruleFlow, {headers: this.header});

        return response.data;
    }

    /**
     * Updates RuleFlow in space.
     *
     * @param ruleId
     * @param ruleFlow
     * @param version
     */
    public async updateRuleFLow(ruleId: string, ruleFlow: RuleFlow, version: number): Promise<number> {

        const url =  `${this.urlBase}/rule-flow/${ruleId}/${version}`;

        const response = await axios.put(url, ruleFlow, {headers: this.header});

        return response.data;
    }

    /**
     * Deletes RuleFlow from space.
     *
     * @param ruleId
     * @param version
     */
    public async deleteRuleFlow(ruleId: string, version?: number): Promise<number> {
        let url: string;

        if (version) {
            url =  `${this.urlBase}/rule-flow/${ruleId}/${version}`;
        } else {
            url =  `${this.urlBase}/rule-flow/${ruleId}/`;
        }

        const response = await axios.delete(url, {headers: this.header});

        return response.status;
    }

    /**
     * Returns RuleFlow from space.
     *
     * @param ruleId
     * @param version
     */
    public async exportRuleFlow(ruleId: string, version?: number): Promise<(DecisionTableRule | DecisionTreeRule | ScriptRule | RuleFlow)[]> {
        let url: string;

        if (version) {
            url =  `${this.urlBase}/rule-flow/export/${ruleId}/${version}`;
        } else {
            url =  `${this.urlBase}/rule-flow/export/${ruleId}/`;
        }

        const response = await axios.get(url, {headers: this.header});

        return response.data;
    }

    /**
     * Imports RuleFlow to the space. Input has to be in format [RuleFlow, RuleFlowRule1,...,RuleFlowRuleN]
     *
     * @param ruleFlow
     * @param ruleId
     * @param version
     */
    public async importRuleFlow(ruleFlow: (DecisionTableRule | DecisionTreeRule | ScriptRule | RuleFlow)[], ruleId?: string, version?: number): Promise<RuleFlow> {

        let url: string = "";

        if (!ruleId && !version) {
            url = `${this.urlBase}/rule-flow/import`;
        }
        
        if (ruleId && !version) {
            url = `${this.urlBase}/rule-flow/import/?new-version=${ruleId}`;
        }
        
        if (ruleId && version) {
            url = `${this.urlBase}/rule-flow/import/?overwrite=${ruleId}&version=${version}`;
        }

        const response = await axios.post(url, ruleFlow, {headers: this.header});

        return response.data;

    }

    /**
     * Publish or unpublish rules.
     *
     * @param ruleId
     * @param status
     * @param version
     */
    public async changeRuleStatus(ruleId: string, status: string, version: number): Promise<(DecisionTableRule | DecisionTreeRule | ScriptRule)> {

        let url: string = `${this.urlBase}/rule/status/${ruleId}/${status}/${version}`;

        const response = await axios.put(url, undefined, {headers: this.header});

        return response.data;

    }

    /**
     * Publish or unpublish RuleFlows
     *
     * @param ruleId
     * @param status
     * @param version
     */
    public async changeRuleFlowStatus(ruleId: string, status: string, version: number): Promise<RuleFlow> {

        let url: string = `${this.urlBase}/rule-flow/status/${ruleId}/${status}/${version}`;

        const response = await axios.put(url, undefined, {headers: this.header});

        return response.data;

    }

    /**
     * Returns rule by its tags.
     *
     * @param tags
     */
    public async getRulesByTags(tags: string[]): Promise<(DecisionTableRule | DecisionTreeRule | ScriptRule | RuleFlow)[]> {

        const tagsQuery = tags.join(",");

        let url: string = `${this.urlBase}/tags/items?tags=${tagsQuery}`;

        const response = await axios.get(url, {headers: this.header});

        return response.data;

    }

    /**
     * Updates tags on rules.
     *
     * @param ruleId
     * @param tags
     * @param version
     */
    public async updateTags(ruleId: string, tags: Tag[], version?: number): Promise<{ message: string }> {

        let url: string;

        if (version) {
            url = `${this.urlBase}/tags/${ruleId}/${version}`
        } else {
            url = `${this.urlBase}/tags/${ruleId}`
        }

        const response = await axios.patch(url, tags, {headers: this.header});

        return response.data;
    }

    /**
     * Delete tags from rules.
     *
     * @param ruleId
     * @param tags
     * @param version
     */
    public async deleteTags(ruleId: string, tags: string[], version?: number): Promise<number> {

        let url: string;

        const tagsQuery = tags.join(',');

        if (version) {
            url = `${this.urlBase}/tags/${ruleId}/${version}?tags=${tagsQuery}`
        } else {
            url = `${this.urlBase}/tags/${ruleId}?tags=${tagsQuery}`
        }

        const response = await axios.delete(url, {headers: this.header});

        return response.status;

    }

}
