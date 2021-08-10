# DecisionRules-JS

A simple library that allows you to easily connect to [Decisionrules.io](https://decisionrules.io) from your web application.
Library is written in JS so it is usable in your Node application.

## Arguments

### Require model arguments

* ApiKey - mandatory part of requestOptions
* GeoLoc - optional argument that specifies desired server location. Defined as ENUM (use DEFAULT when you dont need to specify location) List of geolocs is in our [docs](https://docs.decisionrules.io/docs/api/geo-location)
* customUrl - optional object for custom DOMAIN if on premise version is used.

### DecisionRules.solver arguments

* ruleId - Rule ID from dashboard
* inputData - data input in JSON parseable format
* SolverStrategy - STANDARD, ARRAY, FIRST_MATCH 
* version - optional argument that specifies rule version, if omitted last version is used.

Solver method returns Promise<any> type.

# NodeJS usage
```javascript
const decisionrules = require('@decisionrules/decisionrules-js');

const drs = new decisionrules.Solver("API_KEY_HERE", decisionrules.GeoLocation.DEFAULT, new CustomDomain);

const data = {
    day: "today"
};

let result;

drs.solver("RULE_ID_HERE", data, decisionrules.SolverStrategy.STANDARD, "VERSION_HERE").then(r => {
    result = r;
    console.log(result[0].result);
})
```

# TypeScript usage
```javascript
import {GeoLocation, Solver, SolverStrategy} from '@decisionrules/decisionrules-js';

const dr = new Solver("API_KEY_HERE", GeoLocation.DEFAULT, "CUSTOM_DOMAIN_HERE");

const data = {
    day: "today"
};

let result;

test.solver("RULE_ID_HERE", data, SolverStrategy.STANDARD, "VERSION_HERE").then(r => {
    result = r;
    console.log(result[0].result);
})
```

## Custom domain init for NodeJS
```javascript

const customDomain = new decisionrules.CustomDomain("your.domain.com", decisionrules.ProtocolsEnum.HTTP);

const drs = new decisionrules.Solver("API_KEY_HERE", decisionrules.GeoLocation.DEFAULT, customDomain);

......
})
```

## Custom domain init for TypeScript
```javascript

const customDomain = new CustomDomain("your.domain.com", ProtocolsEnum.HTTPS);

const dr = new Solver("API_KEY_HERE", GeoLocation.DEFAULT, customDomain);

.....
```
Define CustomDomain object that takes your domain string name and desired HTTP protocol from ProtocolsEnum enum.

Solver method return promise that can be resolved later.

Geolocation and version parameters are optional and can be omitted.
