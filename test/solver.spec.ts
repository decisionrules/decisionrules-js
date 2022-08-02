import * as sinon from 'sinon';
import {SinonSandbox} from 'sinon';
import axios from 'axios';
import {expect} from "chai";
import {Solver} from '../src';
import {Protocol, RuleFlowStrategy, RuleStrategy, SolverMode} from "../src/Enums";
import {CustomDomain} from "../src";


interface SolveConfig {
    apiKey: string;
    ruleId: string;
    reqData : any;
    version: number | 'latest';
    strategy?: RuleStrategy | RuleFlowStrategy;
    correlationId?: string;
    customDomain?: CustomDomain;
    resStatus: number;
    resData: any;
    expectedUrl: string;
    expectedBody: any;
    expectedConfig: any;
}

async function testSolve(solverMode: SolverMode, solveConfig: SolveConfig, sandbox: SinonSandbox) {
    const solver = new Solver(solveConfig.apiKey, solveConfig.customDomain);
    const axiosStub = sandbox.stub(axios, 'post').returns(Promise.resolve({
        status: solveConfig.resStatus,
        data: solveConfig.resData
    }));
    let solverRes;
    if (solverMode === SolverMode.RULE) {
        const strategy = solveConfig.strategy as RuleStrategy;
        solverRes = await solver.solveRule(solveConfig.ruleId, solveConfig.reqData, solveConfig.version, strategy, solveConfig.correlationId);
    }
    if (solverMode === SolverMode.RULEFLOW) {
        const strategy = solveConfig.strategy as RuleFlowStrategy;
        solverRes = await solver.solveRuleFlow(solveConfig.ruleId, solveConfig.reqData, solveConfig.version, strategy, solveConfig.correlationId);
    }
    const axiosCall = axiosStub.getCall(0);
    expect(axiosStub.callCount).to.equal(1);
    expect(axiosCall.args[0]).to.equal(solveConfig.expectedUrl);
    expect(axiosCall.args[1]).to.deep.equal(solveConfig.expectedBody);
    expect(axiosCall.args[2]).to.deep.equal(solveConfig.expectedConfig);
    expect(solverRes).to.deep.equal(solveConfig.resData);
}


describe('solver', () => {
    describe('solveRule', () => {
        let sandbox: SinonSandbox;
        const solverMode = SolverMode.RULE;

        beforeEach(() => {
            sandbox = sinon.createSandbox();
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should call solver with version 1', async () => {
            const reqData = { input: 'Answer to the Ultimate Question of Life, the Universe, and Everything' };
            const solveConfig: SolveConfig = {
                apiKey: 'fake-api-key',
                ruleId: 'fake-rule-id',
                reqData,
                version: 1,
                resStatus: 200,
                resData: [ { output: '42' } ],
                expectedUrl: 'https://api.decisionrules.io:443/rule/solve/fake-rule-id/1',
                expectedBody: {data: reqData},
                expectedConfig: {headers: {
                        Authorization: 'Bearer fake-api-key',
                        "Content-Type": 'application/json'
                    }}
            };
            await testSolve(solverMode, solveConfig, sandbox);
        });

        it('should call solver with custom domain', async () => {
            const reqData = { input: 'Answer to the Ultimate Question of Life, the Universe, and Everything' };
            const solveConfig: SolveConfig = {
                apiKey: 'fake-api-key',
                ruleId: 'fake-rule-id',
                reqData,
                version: 'latest',
                customDomain: {
                    domainName: 'custom-domain.com',
                    protocol: Protocol.HTTP,
                    port: 80
                },
                resStatus: 200,
                resData: [ { output: '42' } ],
                expectedUrl: 'http://custom-domain.com:80/rule/solve/fake-rule-id',
                expectedBody: {data: reqData},
                expectedConfig: {headers: {
                        Authorization: 'Bearer fake-api-key',
                        "Content-Type": 'application/json'
                    }}
            };
            await testSolve(solverMode, solveConfig, sandbox);
        });

        it('should call solver with strategy', async () => {
            const reqData = { input: 'Answer to the Ultimate Question of Life, the Universe, and Everything' };
            const solveConfig: SolveConfig = {
                apiKey: 'fake-api-key',
                ruleId: 'fake-rule-id',
                reqData : reqData,
                version: 'latest',
                strategy: RuleStrategy.FIRST_MATCH,
                resStatus: 200,
                resData: [ { output: '42' } ],
                expectedUrl: 'https://api.decisionrules.io:443/rule/solve/fake-rule-id',
                expectedBody: {data: reqData},
                expectedConfig: {headers: {
                        Authorization: 'Bearer fake-api-key',
                        "X-Strategy": RuleStrategy.FIRST_MATCH,
                        "Content-Type": 'application/json'
                    }}
            };
            await testSolve(solverMode, solveConfig, sandbox);
        });

        it('should call solver with correlation id', async () => {
            const reqData = { input: 'Answer to the Ultimate Question of Life, the Universe, and Everything' };
            const solveConfig: SolveConfig = {
                apiKey: 'fake-api-key',
                ruleId: 'fake-rule-id',
                reqData : reqData,
                version: 'latest',
                strategy: RuleStrategy.FIRST_MATCH,
                correlationId: 'foo',
                resStatus: 200,
                resData: [ { output: '42' } ],
                expectedUrl: 'https://api.decisionrules.io:443/rule/solve/fake-rule-id',
                expectedBody: {data: reqData},
                expectedConfig: {headers: {
                        'Authorization': 'Bearer fake-api-key',
                        'X-Strategy': RuleStrategy.FIRST_MATCH,
                        'Content-Type': 'application/json',
                        'X-Correlation-Id': 'foo'
                    }}
            };
            await testSolve(solverMode, solveConfig, sandbox);
        });

        it('should call solver with wrong api key', async () => {
            const reqData = { input: 'Answer to the Ultimate Question of Life, the Universe, and Everything' };
            const solveConfig: SolveConfig = {
                apiKey: 'wrong-api-key',
                ruleId: 'fake-rule-id',
                reqData : reqData,
                version: 'latest',
                strategy: RuleStrategy.FIRST_MATCH,
                resStatus: 401,
                resData: {
                    "error": {
                        "message": "Invalid Rule Id, Rule Flow Id or API key"
                    }
                },
                expectedUrl: 'https://api.decisionrules.io:443/rule/solve/fake-rule-id',
                expectedBody: {data: reqData},
                expectedConfig: {headers: {
                        "Authorization": 'Bearer wrong-api-key',
                        "X-Strategy": RuleStrategy.FIRST_MATCH,
                        "Content-Type": 'application/json'
                    }}
            };
            await testSolve(solverMode, solveConfig, sandbox);
        });

    });

    describe('solveRuleFlow', () => {
        let sandbox: SinonSandbox;
        const solverMode = SolverMode.RULEFLOW;

        beforeEach(() => {
            sandbox = sinon.createSandbox();
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should call solver with version 1', async () => {
            const reqData = { input: 'Answer to the Ultimate Question of Life, the Universe, and Everything' };
            const solveConfig: SolveConfig = {
                apiKey: 'fake-api-key',
                ruleId: 'fake-rule-id',
                reqData,
                version: 1,
                resStatus: 200,
                resData: [ { output: '42' } ],
                expectedUrl: 'https://api.decisionrules.io:443/composition/solve/fake-rule-id/1',
                expectedBody: {data: reqData},
                expectedConfig: {headers: {
                        Authorization: 'Bearer fake-api-key',
                        "Content-Type": 'application/json'
                    }}
            };
            await testSolve(solverMode, solveConfig, sandbox);
        });

        it('should call solver with custom domain', async () => {
            const reqData = { input: 'Answer to the Ultimate Question of Life, the Universe, and Everything' };
            const solveConfig: SolveConfig = {
                apiKey: 'fake-api-key',
                ruleId: 'fake-rule-id',
                reqData,
                version: 'latest',
                customDomain: {
                    domainName: 'custom-domain.com',
                    protocol: Protocol.HTTP,
                    port: 80
                },
                resStatus: 200,
                resData: [ { output: '42' } ],
                expectedUrl: 'http://custom-domain.com:80/composition/solve/fake-rule-id',
                expectedBody: {data: reqData},
                expectedConfig: {headers: {
                        Authorization: 'Bearer fake-api-key',
                        "Content-Type": 'application/json'
                    }}
            };
            await testSolve(solverMode, solveConfig, sandbox);
        });

        it('should call solver with strategy', async () => {
            const reqData = { input: 'Answer to the Ultimate Question of Life, the Universe, and Everything' };
            const solveConfig: SolveConfig = {
                apiKey: 'fake-api-key',
                ruleId: 'fake-rule-id',
                reqData : reqData,
                version: 'latest',
                strategy: RuleStrategy.FIRST_MATCH,
                resStatus: 200,
                resData: [ { output: '42' } ],
                expectedUrl: 'https://api.decisionrules.io:443/composition/solve/fake-rule-id',
                expectedBody: {data: reqData},
                expectedConfig: {headers: {
                        Authorization: 'Bearer fake-api-key',
                        "X-Strategy": RuleStrategy.FIRST_MATCH,
                        "Content-Type": 'application/json'
                    }}
            };
            await testSolve(solverMode, solveConfig, sandbox);
        });

        it('should call solver with correlation id', async () => {
            const reqData = { input: 'Answer to the Ultimate Question of Life, the Universe, and Everything' };
            const solveConfig: SolveConfig = {
                apiKey: 'fake-api-key',
                ruleId: 'fake-rule-id',
                reqData : reqData,
                version: 'latest',
                strategy: RuleStrategy.FIRST_MATCH,
                correlationId: 'foo',
                resStatus: 200,
                resData: [ { output: '42' } ],
                expectedUrl: 'https://api.decisionrules.io:443/composition/solve/fake-rule-id',
                expectedBody: {data: reqData},
                expectedConfig: {headers: {
                        'Authorization': 'Bearer fake-api-key',
                        'X-Strategy': RuleStrategy.FIRST_MATCH,
                        'Content-Type': 'application/json',
                        'X-Correlation-Id': 'foo'
                    }}
            };
            await testSolve(solverMode, solveConfig, sandbox);
        });

        it('should call solver with wrong api key', async () => {
            const reqData = { input: 'Answer to the Ultimate Question of Life, the Universe, and Everything' };
            const solveConfig: SolveConfig = {
                apiKey: 'wrong-api-key',
                ruleId: 'fake-rule-id',
                reqData : reqData,
                version: 'latest',
                strategy: RuleStrategy.FIRST_MATCH,
                resStatus: 401,
                resData: {
                    "error": {
                        "message": "Invalid Rule Id, Rule Flow Id or API key"
                    }
                },
                expectedUrl: 'https://api.decisionrules.io:443/composition/solve/fake-rule-id',
                expectedBody: {data: reqData},
                expectedConfig: {headers: {
                        "Authorization": 'Bearer wrong-api-key',
                        "X-Strategy": RuleStrategy.FIRST_MATCH,
                        "Content-Type": 'application/json'
                    }}
            };
            await testSolve(solverMode, solveConfig, sandbox);
        });

    });
});
