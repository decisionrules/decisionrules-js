# DecisionRules-JS

A simple library that allows you to easily connect to [Decisionrules.io](https://decisionrules.io) from your application.

## Table of contents

1. [Usage](#usage)
2. [Solver](#solver)
3. [Defining config object](#config)
4. [Solver usage example](#solver_usage)
5. [Solver with custom domain example](#solver_domain)
6. [Switching between Rule Solver and Composition Solver](#switch)
7. [Management API](#management_api)
8. [Management API usage example](#mana_example)
9. [All available methods in management API](#methods)

<a name="usage"></a>
## Usage 

* Solver (Rules, Compositions)
* Management API

<a name="solver"></a>
## 1 - Solver

Solver is designed for solving rules made in DecisionRules application. Simply
Initialize `Solver` instance and populate config object. After that you use solver method.
Rule ids are accessible in DecisionRules app.

<a name="config"></a>
### 1.1 - Defining config object

Config object is defined by `DecisionRulesConfigModel`

````typescript
const config: DecisionRulesConfigModel = {
    authKey : "API KEY",
    geoLoc : GeoLocation.DEFAULT,
    strategy : SolverStrategy.STANDARD,
    customDomain: new CustomDomain(Protocols.HTTP, "api.decisionrules.io"), // OPTIONAL
    publicAuthKey: "MANAGEMENT KEY" // OPTIONAL
}
````

<a name="solver_usage"></a>
### 1.2 - Solver usage example

Solver methods are defined in `Solver` class.

```typescript
export class Example {
    private decisionrules;
    private readonly config: DecisionRulesConfigModel;

    constructor() {
        this.config = {
            authKey : "API KEY",
            geoLoc : GeoLocation.DEFAULT,
            strategy : SolverStrategy.STANDARD
        }
        this.decisionrules = new Solver(this.config);
    }

    private data = {
        data: {
            say: "Do not eat hedgehogs"
        }
    }

    private readonly ruleId = "RULE ID";

    async callSolver(){
        return await this.decisionrules.solver(SolverTypes.RULE, this.data, this.ruleId);
    }
}
```
<a name="solver_domain"></a>
### 1.3 - Solver with custom domain example

To use custom domain just add customDomain key to the config a populate it with `new CustomDomain` instance.
Protocol is defined by `Protocols` enum.

```typescript
export class Example {
    private decisionrules;
    private readonly config: DecisionRulesConfigModel;

    constructor() {
        this.config = {
            authKey : "API KEY",
            geoLoc : GeoLocation.DEFAULT,
            strategy : SolverStrategy.STANDARD,
            customDomain: new CustomDomain(Protocols.HTTP, "api.decisionrules.io")
        }
        this.decisionrules = new Solver(this.config);
    }

    private data = {
        data: {
            say: "Do not eat hedgehogs"
        }
    }

    private readonly ruleId = "RULE ID";

    async callSolver(){
        return await this.decisionrules.solver(SolverTypes.RULE, this.data, this.ruleId);
    }
}
```
<a name="switch"></a>
### 1.4 - Switching between Rule Solver and Composition Solver

If you wish to solve compositions you can simply change `solverType` attribute in `Solver.solver` method.

```Typescript
return await this.decisionrules.solver(SolverTypes.RULEFLOW, this.data, this.ruleId);
```

<a name="management_api"></a>
## 2 - Management API

Management api is accessible in `DrManagementApi` and required management api key that you can obtain in api key section
in DecisionRules app. Management api key is defined in config object (see 1.1).

<a name="mana_example"></a>
### 2.1 Management API usage example

Management api is defined by `DrManagementApi` class.

```typescript
export class Example {
    private managementApi;
    private readonly config: DecisionRulesConfigModel;

    constructor() {
        this.config = {
            authKey: "API KEY",
            geoLoc: GeoLocation.DEFAULT,
            strategy: SolverStrategy.STANDARD,
            publicAuthKey: "MANAGEMENT KEY"
        }
        this.managementApi = new DrManagementApi(this.config);
    }

    private data = {
        data: {
            say: "Do not eat hedgehogs"
        }
    }

    private readonly ruleId = "RULE ID";

    async getRuleById() {
        return await this.publicApi.getRuleById(this.ruleId);
    }
}
```

<a name="methods"></a>
### 2.3 All available methods in management API

* GetRuleById - Search for single rule by its ID
* GetRuleByIdAndVersion - Search for single rule by its ID and version
* GetSpace - Search for space by its ID
* PostRuleForSpace - Post new rule to the space
* PutRule - Update existing rule
* DeleteRule - Delete existing rule

```typescript
this.publicApi.getRuleById(ruleId);

this.publicApi.getRuleByIdAndVersion(ruleId, version);

this.publicApi.getSpace(spaceId);

this.publicApi.postRuleForSpace(spaceId, ruleDataModel);

this.publicApi.putRule(ruleId, version, ruleDataModel);

this.publicApi.deleteRule(ruleId, version);
```
