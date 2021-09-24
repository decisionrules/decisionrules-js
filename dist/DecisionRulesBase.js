"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecisionRulesBase = void 0;
var SolverStrategies_1 = require("./enums/SolverStrategies");
var DecisionRulesBase = /** @class */ (function () {
    function DecisionRulesBase(config) {
        this.solverConfig = __assign({}, config);
    }
    DecisionRulesBase.prototype.headerFactory = function (authKey, strategy) {
        if (strategy === SolverStrategies_1.SolverStrategy.STANDARD) {
            return { Authorization: "Bearer " + this.solverConfig.authKey, 'Content-Type': 'application/json' };
        }
        else {
            return { Authorization: "Bearer " + this.solverConfig.authKey, 'Content-Type': 'application/json', 'X-Strategy': this.solverConfig.strategy };
        }
    };
    DecisionRulesBase.prototype.solverUrlFactory = function (geoLoc, solverType, customDomain) {
        var url;
        if (customDomain) {
            url = customDomain.protocol + "://" + customDomain.domain + "/" + solverType + "/solve/";
        }
        else {
            url = "https://" + geoLoc + ".decisionrules.io/" + solverType + "/solve/";
        }
        return url;
    };
    return DecisionRulesBase;
}());
exports.DecisionRulesBase = DecisionRulesBase;
