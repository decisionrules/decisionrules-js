"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomDomain = void 0;
var CustomDomain = /** @class */ (function () {
    function CustomDomain(protocol, domain) {
        this._protocol = protocol;
        this._domain = domain;
    }
    Object.defineProperty(CustomDomain.prototype, "protocol", {
        get: function () {
            return this._protocol;
        },
        set: function (value) {
            this._protocol = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomDomain.prototype, "domain", {
        get: function () {
            return this._domain;
        },
        set: function (value) {
            this._domain = value;
        },
        enumerable: false,
        configurable: true
    });
    return CustomDomain;
}());
exports.CustomDomain = CustomDomain;
