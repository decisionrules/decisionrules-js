import { HeaderContext, ManagementHeader } from "./Header";
import { CustomDomain, HttpHeader } from "./Types";
import { ManagementUrl, UrlContext } from "./Url";
import axios from "axios";

export class ManagementApi {

    private readonly apikey: string;
    private readonly customDomain: CustomDomain;
    private readonly header: HttpHeader;
    private readonly urlBase: string;

    constructor(managementKey: string, customDomain: CustomDomain) {
        this.apikey = managementKey;
        this.customDomain = customDomain;
        this.header = new HeaderContext(new ManagementHeader()).createHeader(this.apikey);
        this.urlBase = new UrlContext(new ManagementUrl).createUrl(undefined, this.customDomain);
    }

    public async getRule(ruleId: string, version?: number) {

        let url: string;

        if (version) {
            url =  `${this.urlBase}/rule/${ruleId}/${version}`;
        } else {
            url =  `${this.urlBase}/rule/${ruleId}/`;
        }

        const response = await axios.get(url, {headers: this.header});

        return response.data;

    }

    public async getSpace() {

        const url: string = `${this.urlBase}/space/items`;

        const response = await axios.get(url, {headers: this.header});

        return response.data;

    }

    public async createRule(spaceId: string, data: object) {

        const url: string = `${this.urlBase}/rule/${spaceId}`;

        const response = await axios.post(url, data, {headers: this.header});

        return response.data;

    }

    public async updateRule(ruleId: string, data: object,  version: number) {

        const url = `${this.urlBase}/rule/${ruleId}/${version}`

        const response = await axios.put(url, data, {headers: this.header});

        return response.status;

    }

    public async deleteRule(ruleId: string, version: number) {

        const url = `${this.urlBase}/rule/${ruleId}/${version}`
        
        const response = await axios.delete(url, {headers: this.header});

        return response.status;
    }

    public async getRuleFlow(ruleId: string, version?: number){
        let url: string;

        if (version) {
            url =  `${this.urlBase}/rule-flow/${ruleId}/${version}`;
        } else {
            url =  `${this.urlBase}/rule-flow/${ruleId}/`;
        }

        const response = await axios.get(url, {headers: this.header});

        return response.data;
    }

    public async createRuleFlow(data: object){
        const url: string =  `${this.urlBase}/rule-flow/`;

        const response = await axios.post(url, data, {headers: this.header});

        return response.data;
    }

    public async updateRuleFLow(ruleId: string, data: object, version: number){

        const url =  `${this.urlBase}/rule-flow/${ruleId}/${version}`;

        const response = await axios.put(url, data, {headers: this.header});

        return response.data;
    }

    public async deleteRuleFlow(ruleId: string, version?: number){
        let url: string;

        if (version) {
            url =  `${this.urlBase}/rule-flow/${ruleId}/${version}`;
        } else {
            url =  `${this.urlBase}/rule-flow/${ruleId}/`;
        }

        const response = await axios.delete(url, {headers: this.header});

        return response.status;
    }

    public async exportRuleFlow(ruleId: string, version?: number){
        let url: string;

        if (version) {
            url =  `${this.urlBase}/rule-flow/export/${ruleId}/${version}`;
        } else {
            url =  `${this.urlBase}/rule-flow/export/${ruleId}/`;
        }

        const response = await axios.get(url, {headers: this.header});

        return response.data;
    }

    public async importRuleFlow(data: object, ruleId?: string, version?: number){

        let url: string = "";

        if (!ruleId && !version) {
            url = `${this.urlBase}/rule-flow/import`;
        }
        
        if (ruleId) {
            url = `${this.urlBase}/rule-flow/import/?new-version=${ruleId}`;
        }
        
        if (ruleId && version) {
            url = `${this.urlBase}/rule-flow/import/?overwrite=${ruleId}&version=${version}`;
        }

        const response = await axios.post(url, data, {headers: this.header});

        return response.data;

    }

    public async changeRuleStatus(ruleId: string, status: string, version: number) {

        let url: string = `${this.urlBase}/rule/status/${ruleId}/${status}/${version}`;

        const response = await axios.put(url, undefined, {headers: this.header});

        return response.data;

    }

    public async changeRuleFlowStatus(ruleId: string, status: string, version: number) {

        let url: string = `${this.urlBase}/rule-flow/status/${ruleId}/${status}/${version}`;

        const response = await axios.put(url, undefined, {headers: this.header});

        return response.data;

    }

    public async getTags() {

        let url: string = `${this.urlBase}/tags/items`;

        const response = await axios.get(url, {headers: this.header});

        return response.data;

    }

    public async updateTags(ruleId: string, data: object, version?: number) {

        let url: string;

        if (version) {
            url = `${this.urlBase}/tags/${ruleId}/${version}`
        } else {
            url = `${this.urlBase}/tags/${ruleId}`
        }

        const response = await axios.patch(url, data, {headers: this.header});

        return response.data;
    }

    public async deleteTags(ruleId: string, tags: Array<string>, version?: number) {

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