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
    /*
    * Solves decision rule or composition.
    *
    * @param solverType - Type of solver is defined in SolverTypes enum. Other values are not allowed.
    * @param data - input object of rule/composition I/O model.
    * @param id - Id of rule or composition
    * @param version - Rule version or composition version.
    *
    * @return - populated output model with solved values as promise.
    * */
    Solver.prototype.solver = function (solverType, data, id, version) {
        var header = this.solverHeaderFactory();
        var apiUrl = this.solverUrlFactory(solverType);
        if (version) {
            apiUrl += id + "/" + version;
        }
        else {
            apiUrl += "" + id;
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
