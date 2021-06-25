"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    constructor(apiKey, geoLoc) {
        this.geoLoc = GeoLocation.DEFAULT;
        this.baseUrl = "api.decisionrules.io/rule/solve";
        this.api_key = apiKey;
        this.geoLoc = geoLoc;
    }
    solver(ruleId, inputData, strategy, version) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = this.urlFactory(ruleId, version);
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
        });
    }
    urlFactory(ruleId, version) {
        let url;
        if (this.geoLoc === GeoLocation.DEFAULT) {
            url = `https://${this.baseUrl}/`;
        }
        else {
            url = `https://${this.geoLoc}.${this.baseUrl}/`;
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