# DecisionRules-JS

A simple library that allows you to easily connect to [Decisionrules.io](https://decisionrules.io) from your web application.
Library is written in JS so it is usable in your Node application.

## Arguments

### Require model arguments

* ApiKey - mandatory part of requestOptions
* GeoLoc - optional argument that specifies desired server location. List of geolocs is in our [docs](https://docs.decisionrules.io/docs/api/geo-location)

### DecisionRules.solver arguments

* ruleId - Rule ID from dashboard
* inputData - data input in JSON parseable format
* version - optional argument that specifies rule version, if omitted last version is used.

Solver method returns Promise<any> type.

# NodeJS usage
```javascript
const decisionrues = require("@decisionrules/decisionrules-js")("YOUR_API_KEY", "GEOLOC");

const INPUT_DATA = { day: "today"}

const result = decisionrues.solver("RULE_ID", INPUT_DATA, "VERSION");

result.then(r => {/*..SUPER STUFF...*/});
```
Solver method return promise that can be resolved later.

Geolocation and version parameters are optional and can be omitted.
