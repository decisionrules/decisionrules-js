# Summary
[Decisionrules.io](https://decisionrules.io/) library that allows you to integrate DecisionRules Solver and Management API to you application as easily as possible. SDK allow you to solve all rule types that are available, CRUD operations on all rule types, rules status management and rule tags management.
> VERSION 3 IS NEW MAJOR VERSION OF THIS SDK AND IT IS STRONGLY RECOMMENDED, DUE TO DEPRECATION OF OLDER VERSIONS.

# Installation
You can simply integrate [SDK](https://www.npmjs.com/package/@decisionrules/decisionrules-js) to your project via NPM package manager.
# Defining Custom domain
Custom domain is special class that is designed for those who uses DecisionRules in private cloud or as on-premise. Class takes up to 3 arguments (where domain name and protocol is mandatory):
|Argument|Data type|
|--|--|
|domain|string|
|protocol|Types.Protocol|
|port|int|
Domain argument is name of desired domain, protocol is HTTP or HTTPS and port is TCP/IP port.
If port is not defined in the class constructor it is set to default value by protocol value, 80 for HTTP and 443 for HTTPS.
```typescript
let customDomain = new CustomDomain("api.mydomain.com", Protocol.HTTP);
let customDomain2 = new CustomDomain("api.mydomain.com", Protocol.HTTPS, 443); 
```
# Using Solver API
Solver class takes up to 2 arguments that are `api key`(can be generated on dashboard), `custom domain` object. Class exposes two async methods: SolveRule and SolveRuleFlow.
```typescript
public async amazingRuleSolver(): Promise<any> 
{
	let solver = new Solver("myApiKey");
	
	let itemId = "id of a rule that is being solved";
	let itemId2 = "id of a ruleflow that is being solved";
	
	var resultForRule = await solver.SolveRule(itemId, data);
	var resultForRuleFlow = await solver.SolverRuleFlow(itemId2, data);
	
	return resultForRule;
}
```
# Using Management API
Management class takes on argument, management api key. Class exposes number of methods listed below.

- getRule - get rule by itemId and version*
- createRule - create rule by spaceId and ruleData
- updateRule - updates rule by itemId, newRuleData and version*
- deleteRule - deletes rule by itemId and version
- getSpaceItems - get space items that belongs to management api key or get items by tags
- getRuleFlow - get rule by itemId and version*
- createRuleFlow - create ruleflow in space that belongs to management api key
- updateRuleFlow - updates ruleflowby itemId, newRuleflowData and version*
- deleteRuleFlow - deletes ruleflow by itemId and version
- exportRuleFlow - exports ruleflow by itemId and version*
- importRuleFlow - import ruleflow as a new ruleflow or new version of existing ruleflow or override existing ruleflow.
- changeRuleStatus - changes rule status
- changeRuleFlowStatus - changes ruleflow status
- updateTags - update tags on rule or ruleflow
- deleteTags - delete tags on rule or ruleflow

> \* = optional argument

## Example usage
```typescript
public async manageRules(): Promise<any>
{
	var manager = new Management("management_key");
	
	var itemId = "some rule or ruleflow id"

	return await manager.getRule(itemId);
} 
```