"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Solver = exports.SolverStrategy = exports.GeoLocation = void 0;
const axios_1 = __importDefault(require("axios"));
var GeoLocation;
(function (GeoLocation) {
    GeoLocation["EU1"] = "eu1";
    GeoLocation["EU2"] = "eu2";
    GeoLocation["US1"] = "us1";
    GeoLocation["US2"] = "us2";
    GeoLocation["DEFAULT"] = "default";
})(GeoLocation = exports.GeoLocation || (exports.GeoLocation = {}));
var SolverStrategy;
(function (SolverStrategy) {
    SolverStrategy["STANDARD"] = "STANDARD";
    SolverStrategy["ARRAY"] = "ARRAY";
    SolverStrategy["FIRST_MATCH"] = "FIRST_MATCH";
})(SolverStrategy = exports.SolverStrategy || (exports.SolverStrategy = {}));
class Solver {
    constructor(apiKey, geoLoc, baseUrl) {
        this.geoLoc = GeoLocation.DEFAULT;
        this.baseUrl = "api.decisionrules.io/rule/solve";
        this.api_key = apiKey;
        this.geoLoc = geoLoc;
        this.customBaseUrl = baseUrl;
    }
    solver(ruleId, inputData, strategy, version) {
        const endpoint = this.urlFactory(ruleId, this.customBaseUrl, version);
        const header = this.headerFactory(this.api_key, strategy);
        return new Promise(((resolve, reject) => {
            axios_1.default.post(endpoint, this.inputDataParser(inputData), { headers: header }).then(r => {
                resolve(r.data);
            }).catch(error => {
                if (error.response) {
                    reject(`Call ended with ${error.response.status}`);
                }
                else if (error.request) {
                    reject("The request was made but not response was received");
                }
                else {
                    reject(`Error: ${error.message}`);
                }
            });
        }));
    }
    urlFactory(ruleId, customBaseUrl, version) {
        let url;
        if (typeof (customBaseUrl) === 'undefined' || customBaseUrl === "" || customBaseUrl === null) {
            if (this.geoLoc === GeoLocation.DEFAULT) {
                url = `https://${this.baseUrl}/`;
            }
            else {
                url = `https://${this.geoLoc}.${this.baseUrl}/`;
            }
        }
        else {
            url = `http://${customBaseUrl}/rule/solve/`;
        }
        if (version != null) {
            url += ruleId;
        }
        else {
            url += `${ruleId}/${version}`;
        }
        return url;
    }
    inputDataParser(inputData) {
        return {
            data: JSON.parse(JSON.stringify(inputData))
        };
    }
    headerFactory(apikey, strategy) {
        if (strategy === SolverStrategy.STANDARD) {
            return { Authorization: `Bearer ${this.api_key}`, 'Content-Type': 'application/json' };
        }
        else {
            return { Authorization: `Bearer ${this.api_key}`, 'Content-Type': 'application/json', 'X-Strategy': strategy };
        }
    }
}
exports.Solver = Solver;
