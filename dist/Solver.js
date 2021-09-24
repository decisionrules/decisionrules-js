"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Solver = void 0;
var DecisionRulesBase_1 = require("./DecisionRulesBase");
var axios_1 = __importDefault(require("axios"));
var Solver = /** @class */ (function (_super) {
    __extends(Solver, _super);
    function Solver(config) {
        return _super.call(this, config) || this;
    }
    Solver.prototype.solver = function (solverType, data, ruleId, version) {
        var header = this.solverHeaderFactory();
        var apiUrl = this.solverUrlFactory(solverType);
        if (version) {
            apiUrl += ruleId + "/" + version;
        }
        else {
            apiUrl += "" + ruleId;
        }
        return axios_1.default.post(apiUrl, data, { headers: header }).then(function (response) {
            return response.data;
        }).catch(function (error) {
            console.error(error);
        });
    };
    return Solver;
}(DecisionRulesBase_1.DecisionRulesBase));
exports.Solver = Solver;
