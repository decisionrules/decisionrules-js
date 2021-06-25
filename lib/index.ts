import axios from 'axios';

export class Solver{
    private api_key: string;
    private geoLoc: string | undefined;

    private readonly baseUrl: string = "api.decisionrules.io/rule/solve";

    constructor(apiKey: string, geoLoc?: string) {
        this.api_key = apiKey;
        this.geoLoc = geoLoc;
    }

    async solver<T>(ruleId:any, inputData: any, version?: string): Promise<T>;
    
    async solver(ruleId: any, inputData: any, version?: string): Promise<any> {
        const endpoint = this.urlFactory(ruleId, version);

        const header = {Authorization: `Bearer ${this.api_key}`, 'Content-Type': 'application/json'}

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
    
    private urlFactory(ruleId: string, version?: string): string {
        let url;

        if (this.geoLoc === null) {
            url = `https://${this.baseUrl}/`;
        } else {
            url = `https://${this.geoLoc}.${this.baseUrl}/`;
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
}
