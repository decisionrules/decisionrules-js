import {DecisionRulesBase} from './DecisionRulesBase';
import {DecisionRulesConfigModel} from './models/Models';
import axios from 'axios';

export class DrManagementApi extends DecisionRulesBase {

    constructor(config: DecisionRulesConfigModel) {
        super(config);
    }

    private url = super.crudUrlFactory();
    private headers = super.publicApiHeaderFactory();

    private async getApiCall(getUrl: string){
        return await axios.get(getUrl, {headers: this.headers}).then(response => {
            return response.data
        }).catch(error => {
            console.error(error);
        });
    }

    /*
    * Search for single rule by its ID
    *
    * @param ruleId - rule id
    *
    * @returns Data model of searched rule.
    * */
    public getRuleById(ruleId: string){
        const getUrl = `${this.url}/rule/${ruleId}`
        return this.getApiCall(getUrl);
    }

    /*
    * Search for single rule by its ID and version
    *
    * @param ruleId - rule id
    * @param version - rule version
    *
    * @returns Data model of searched rule
    * */
    public getRuleByIdAndVersion(ruleId: string, version: string) {
        const getUrl = `${this.url}/rule/${ruleId}/${version}`
        return this.getApiCall(getUrl);
    }

    /*
    * Search for space by its ID
    *
    * @param spaceId - space id
    *
    * @returns Space information
    * */
    public getSpace(spaceId: string) {
        const getUrl = `${this.url}/space/${spaceId}`;
        return this.getApiCall(getUrl);
    }

    /*
    * Post new rule to the space
    *
    * @param spaceId - space id of desired destination
    * @param data - rule model
    *
    * @returns Model of posted rule
    * */
    public postRuleForSpace(spaceId: string, data: any) {
        const postUrl = `${this.url}/rule/${spaceId}`;
        return axios.post(postUrl, data, {headers: this.headers}).then(response => {
            return response.data;
        }).catch(error => {
            console.error(error);
        });
    }

    /*
    * Update existing rule
    *
    * @param ruleId - ruleId of rule that will be updated
    * @param version - version of rule that will be updated
    * @param data - rule model that's gonna replace old one
    *
    * @returns Rule model of new rule
    *
    * */
    public putRule(ruleId: string, version: string, data: any) {
        const putUrl = `${this.url}/rule/${ruleId}/${version}`;
        return axios.put(putUrl, data, {headers: this.headers}).then(response => {
            return response.data;
        }).catch(error => {
            console.error(error);
        });
    }

    /*
    * Delete rule by its ruleId and version
    *
    * @param ruleId - ruleId of rule that should be deleted
    * @param version - version of rule that should be deleted
    *
    * @returns Doesnt return anything.
    * */
    public deleteRule(ruleId: string, version: string) {
        const deleteUrl = `${this.url}/rule/${ruleId}/${version}`;
        return axios.delete(deleteUrl, {headers: this.headers}).then(response => {
            return response.data;
        }).catch(error => {
            console.error(error);
        });
    }
}
