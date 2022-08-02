import * as sinon from 'sinon';
import {SinonSandbox} from 'sinon';
import axios from 'axios';
import {expect} from "chai";
import {Management} from '../src';
import {CustomDomain} from "../src";
import {Protocol} from "../src/Enums";


interface ManagementConfig {
    apiKey: string;
    customDomain?: CustomDomain;
    method: any;
    resStatus: number;
    resData: any;
    expectedUrl: string;
    expectedBody?: any;
    expectedConfig: any;
}

function getAxiosStub(sandbox: SinonSandbox, managementConfig: ManagementConfig) {
    return sandbox.stub(axios, managementConfig.method).returns(Promise.resolve({
        status: managementConfig.resStatus,
        data: managementConfig.resData
    }));
}

function testAxiosStub(axiosStub: any, managementConfig: ManagementConfig) {
    const axiosCall = axiosStub.getCall(0);
    expect(axiosStub.callCount).to.equal(1);
    expect(axiosCall.args[0]).to.equal(managementConfig.expectedUrl);
    if (managementConfig.expectedBody) {
        if (managementConfig.expectedBody === 'undefined') {
            managementConfig.expectedBody = undefined;
        }
        expect(axiosCall.args[1]).to.deep.equal(managementConfig.expectedBody);
        expect(axiosCall.args[2]).to.deep.equal(managementConfig.expectedConfig);
    } else {
        expect(axiosCall.args[1]).to.deep.equal(managementConfig.expectedConfig);
    }
}

async function testManagement(method: any, args: any[], managementConfig: ManagementConfig, sandbox: SinonSandbox) {
    const axiosStub = getAxiosStub(sandbox, managementConfig);
    const res = await method(...args);
    testAxiosStub(axiosStub, managementConfig);
    expect(res).to.deep.equal(managementConfig.resData); // Included only to give some insight into the returned data
}

describe('management', () => {

    // Rules

    describe('getRule', () => {
        let sandbox: SinonSandbox;
        beforeEach(() => { sandbox = sinon.createSandbox();});
        afterEach(() => { sandbox.restore(); });

        it('should get rule', async () => {
            const args = ['fake-rule-id'];
            const managementConfig : ManagementConfig = {
                apiKey: 'fake-api-key',
                method: 'get',
                resStatus: 200,
                resData: {name: 'MY RULE'},
                expectedUrl: 'https://api.decisionrules.io:443/api/rule/fake-rule-id/',
                expectedConfig: {headers: {
                        Authorization: 'Bearer fake-api-key',
                        "Content-Type": 'application/json'
                    }}
            };
            const management = new Management(managementConfig.apiKey,managementConfig.customDomain);
            await testManagement(management.getRule.bind(management), args, managementConfig, sandbox);
        });

        it('should get rule with version', async () => {
            const args = ['fake-rule-id',1];
            const managementConfig : ManagementConfig = {
                apiKey: 'fake-api-key',
                method: 'get',
                resStatus: 200,
                resData: {name: 'MY RULE'},
                expectedUrl: 'https://api.decisionrules.io:443/api/rule/fake-rule-id/1',
                expectedConfig: {headers: {
                        Authorization: 'Bearer fake-api-key',
                        "Content-Type": 'application/json'
                    }}
            };
            const management = new Management(managementConfig.apiKey,managementConfig.customDomain);
            await testManagement(management.getRule.bind(management), args, managementConfig, sandbox);
        });

        it('should get rule with custom domain', async () => {
            const args = ['fake-rule-id'];
            const managementConfig : ManagementConfig = {
                apiKey: 'fake-api-key',
                customDomain: {
                    domainName: 'custom-domain.com',
                    protocol: Protocol.HTTP,
                    port: 80
                },
                method: 'get',
                resStatus: 200,
                resData: {name: 'MY RULE'},
                expectedUrl: 'http://custom-domain.com:80/api/rule/fake-rule-id/',
                expectedConfig: {headers: {
                        Authorization: 'Bearer fake-api-key',
                        "Content-Type": 'application/json'
                    }}
            };
            const management = new Management(managementConfig.apiKey,managementConfig.customDomain);
            await testManagement(management.getRule.bind(management), args, managementConfig, sandbox);
        });
    });

    describe('getSpaceItems', () => {
        let sandbox: SinonSandbox;
        beforeEach(() => { sandbox = sinon.createSandbox();});
        afterEach(() => { sandbox.restore(); });

        it('should get space items', async () => {
            const args: any[] = [];
            const managementConfig : ManagementConfig = {
                apiKey: 'fake-api-key',
                method: 'get',
                resStatus: 200,
                resData: [{name: 'MY RULE'},{name: 'MY RULE 2'}],
                expectedUrl: 'https://api.decisionrules.io:443/api/space/items',
                expectedConfig: {headers: {
                        Authorization: 'Bearer fake-api-key',
                        "Content-Type": 'application/json'
                    }}
            };
            const management = new Management(managementConfig.apiKey,managementConfig.customDomain);
            await testManagement(management.getSpaceItems.bind(management), args, managementConfig, sandbox);
        });
    });

    describe('createRule', () => {
        let sandbox: SinonSandbox;
        beforeEach(() => { sandbox = sinon.createSandbox();});
        afterEach(() => { sandbox.restore(); });

        it('should create rule', async () => {
            const args = [{name: 'MY NEW RULE'}];
            const managementConfig : ManagementConfig = {
                apiKey: 'fake-api-key',
                method: 'post',
                resStatus: 200,
                resData: {name: 'MY NEW RULE'},
                expectedUrl: 'https://api.decisionrules.io:443/api/rule/',
                expectedBody: {name: 'MY NEW RULE'},
                expectedConfig: {headers: {
                        Authorization: 'Bearer fake-api-key',
                        "Content-Type": 'application/json'
                    }}
            };
            const management = new Management(managementConfig.apiKey,managementConfig.customDomain);
            await testManagement(management.createRule.bind(management), args, managementConfig, sandbox);
        });
    });

    describe('updateRule', () => {
        let sandbox: SinonSandbox;
        beforeEach(() => { sandbox = sinon.createSandbox();});
        afterEach(() => { sandbox.restore(); });

        it('should update rule', async () => {
            const args = ['fake-rule-id', {name: 'MY NEW RULE'}, 2];
            const managementConfig : ManagementConfig = {
                apiKey: 'fake-api-key',
                method: 'put',
                resStatus: 200,
                resData: 200,
                expectedUrl: 'https://api.decisionrules.io:443/api/rule/fake-rule-id/2',
                expectedBody: {name: 'MY NEW RULE'},
                expectedConfig: {headers: {
                        Authorization: 'Bearer fake-api-key',
                        "Content-Type": 'application/json'
                    }}
            };
            const management = new Management(managementConfig.apiKey,managementConfig.customDomain);
            await testManagement(management.updateRule.bind(management), args, managementConfig, sandbox);
        });
    });

    describe('deleteRule', () => {
        let sandbox: SinonSandbox;
        beforeEach(() => { sandbox = sinon.createSandbox();});
        afterEach(() => { sandbox.restore(); });

        it('should delete rule', async () => {
            const args = ['fake-rule-id', 2];
            const managementConfig : ManagementConfig = {
                apiKey: 'fake-api-key',
                method: 'delete',
                resStatus: 200,
                resData: 200,
                expectedUrl: 'https://api.decisionrules.io:443/api/rule/fake-rule-id/2',
                expectedConfig: {headers: {
                        Authorization: 'Bearer fake-api-key',
                        "Content-Type": 'application/json'
                    }}
            };
            const management = new Management(managementConfig.apiKey,managementConfig.customDomain);
            await testManagement(management.deleteRule.bind(management), args, managementConfig, sandbox);
        });
    });

    describe('changeRuleStatus', () => {
        let sandbox: SinonSandbox;
        beforeEach(() => { sandbox = sinon.createSandbox();});
        afterEach(() => { sandbox.restore(); });

        it('should change rule status', async () => {
            const args = ['fake-rule-id', 'published', 2];
            const managementConfig : ManagementConfig = {
                apiKey: 'fake-api-key',
                method: 'put',
                resStatus: 200,
                resData: {name: 'MY RULE'},
                expectedUrl: 'https://api.decisionrules.io:443/api/rule/status/fake-rule-id/published/2',
                expectedBody: 'undefined',
                expectedConfig: {headers: {
                        Authorization: 'Bearer fake-api-key',
                        "Content-Type": 'application/json'
                    }}
            };
            const management = new Management(managementConfig.apiKey,managementConfig.customDomain);
            await testManagement(management.changeRuleStatus.bind(management), args, managementConfig, sandbox);
        });
    });

    // Rule Flows

    describe('getRuleFlow', () => {
        let sandbox: SinonSandbox;
        beforeEach(() => { sandbox = sinon.createSandbox();});
        afterEach(() => { sandbox.restore(); });

        it('should get rule flow', async () => {
            const args = ['fake-rule-id'];
            const managementConfig : ManagementConfig = {
                apiKey: 'fake-api-key',
                method: 'get',
                resStatus: 200,
                resData: {name: 'MY RULE'},
                expectedUrl: 'https://api.decisionrules.io:443/api/rule-flow/fake-rule-id/',
                expectedConfig: {headers: {
                        Authorization: 'Bearer fake-api-key',
                        "Content-Type": 'application/json'
                    }}
            };
            const management = new Management(managementConfig.apiKey,managementConfig.customDomain);
            await testManagement(management.getRuleFlow.bind(management), args, managementConfig, sandbox);
        });

        it('should get rule flow with version', async () => {
            const args = ['fake-rule-id',1];
            const managementConfig : ManagementConfig = {
                apiKey: 'fake-api-key',
                method: 'get',
                resStatus: 200,
                resData: {name: 'MY RULE'},
                expectedUrl: 'https://api.decisionrules.io:443/api/rule-flow/fake-rule-id/1',
                expectedConfig: {headers: {
                        Authorization: 'Bearer fake-api-key',
                        "Content-Type": 'application/json'
                    }}
            };
            const management = new Management(managementConfig.apiKey,managementConfig.customDomain);
            await testManagement(management.getRuleFlow.bind(management), args, managementConfig, sandbox);
        });
    });

    describe('createRuleFlow', () => {
        let sandbox: SinonSandbox;
        beforeEach(() => { sandbox = sinon.createSandbox();});
        afterEach(() => { sandbox.restore(); });

        it('should create rule', async () => {
            const args = [{name: 'MY NEW RULE'}];
            const managementConfig : ManagementConfig = {
                apiKey: 'fake-api-key',
                method: 'post',
                resStatus: 200,
                resData: {name: 'MY NEW RULE'},
                expectedUrl: 'https://api.decisionrules.io:443/api/rule-flow/',
                expectedBody: {name: 'MY NEW RULE'},
                expectedConfig: {headers: {
                        Authorization: 'Bearer fake-api-key',
                        "Content-Type": 'application/json'
                    }}
            };
            const management = new Management(managementConfig.apiKey,managementConfig.customDomain);
            await testManagement(management.createRuleFlow.bind(management), args, managementConfig, sandbox);
        });
    });

    describe('updateRuleFLow', () => {
        let sandbox: SinonSandbox;
        beforeEach(() => { sandbox = sinon.createSandbox();});
        afterEach(() => { sandbox.restore(); });

        it('should update rule', async () => {
            const args = ['fake-rule-id', {name: 'MY NEW RULE'}, 2];
            const managementConfig : ManagementConfig = {
                apiKey: 'fake-api-key',
                method: 'put',
                resStatus: 200,
                resData: 200,
                expectedUrl: 'https://api.decisionrules.io:443/api/rule-flow/fake-rule-id/2',
                expectedBody: {name: 'MY NEW RULE'},
                expectedConfig: {headers: {
                        Authorization: 'Bearer fake-api-key',
                        "Content-Type": 'application/json'
                    }}
            };
            const management = new Management(managementConfig.apiKey,managementConfig.customDomain);
            await testManagement(management.updateRuleFLow.bind(management), args, managementConfig, sandbox);
        });
    });

    describe('deleteRuleFlow', () => {
        let sandbox: SinonSandbox;
        beforeEach(() => { sandbox = sinon.createSandbox();});
        afterEach(() => { sandbox.restore(); });

        it('should delete rule flow', async () => {
            const args = ['fake-rule-id'];
            const managementConfig : ManagementConfig = {
                apiKey: 'fake-api-key',
                method: 'delete',
                resStatus: 200,
                resData: 200,
                expectedUrl: 'https://api.decisionrules.io:443/api/rule-flow/fake-rule-id/',
                expectedConfig: {headers: {
                        Authorization: 'Bearer fake-api-key',
                        "Content-Type": 'application/json'
                    }}
            };
            const management = new Management(managementConfig.apiKey,managementConfig.customDomain);
            await testManagement(management.deleteRuleFlow.bind(management), args, managementConfig, sandbox);
        });

        it('should delete rule flow with version', async () => {
            const args = ['fake-rule-id', 2];
            const managementConfig : ManagementConfig = {
                apiKey: 'fake-api-key',
                method: 'delete',
                resStatus: 200,
                resData: 200,
                expectedUrl: 'https://api.decisionrules.io:443/api/rule-flow/fake-rule-id/2',
                expectedConfig: {headers: {
                        Authorization: 'Bearer fake-api-key',
                        "Content-Type": 'application/json'
                    }}
            };
            const management = new Management(managementConfig.apiKey,managementConfig.customDomain);
            await testManagement(management.deleteRuleFlow.bind(management), args, managementConfig, sandbox);
        });
    });

    describe('exportRuleFlow', () => {
        let sandbox: SinonSandbox;
        beforeEach(() => { sandbox = sinon.createSandbox();});
        afterEach(() => { sandbox.restore(); });

        it('should export rule flow', async () => {
            const args = ['fake-rule-id'];
            const managementConfig : ManagementConfig = {
                apiKey: 'fake-api-key',
                method: 'get',
                resStatus: 200,
                resData: {name: 'MY RULE'},
                expectedUrl: 'https://api.decisionrules.io:443/api/rule-flow/export/fake-rule-id/',
                expectedConfig: {headers: {
                        Authorization: 'Bearer fake-api-key',
                        "Content-Type": 'application/json'
                    }}
            };
            const management = new Management(managementConfig.apiKey,managementConfig.customDomain);
            await testManagement(management.exportRuleFlow.bind(management), args, managementConfig, sandbox);
        });

        it('should export rule flow with version', async () => {
            const args = ['fake-rule-id', 2];
            const managementConfig : ManagementConfig = {
                apiKey: 'fake-api-key',
                method: 'get',
                resStatus: 200,
                resData: {name: 'MY RULE'},
                expectedUrl: 'https://api.decisionrules.io:443/api/rule-flow/export/fake-rule-id/2',
                expectedConfig: {headers: {
                        Authorization: 'Bearer fake-api-key',
                        "Content-Type": 'application/json'
                    }}
            };
            const management = new Management(managementConfig.apiKey,managementConfig.customDomain);
            await testManagement(management.exportRuleFlow.bind(management), args, managementConfig, sandbox);
        });
    });

    describe('importRuleFlow with ruleId and version', () => {
        let sandbox: SinonSandbox;
        beforeEach(() => { sandbox = sinon.createSandbox();});
        afterEach(() => { sandbox.restore(); });

        it('should import rule flow with rule id and version', async () => {
            const args = [{name: 'MY RULE'}, 'fake-rule-id', 2];
            const managementConfig : ManagementConfig = {
                apiKey: 'fake-api-key',
                method: 'post',
                resStatus: 200,
                resData: {name: 'MY RULE'},
                expectedUrl: 'https://api.decisionrules.io:443/api/rule-flow/import/?overwrite=fake-rule-id&version=2',
                expectedBody: {name: 'MY RULE'},
                expectedConfig: {headers: {
                        Authorization: 'Bearer fake-api-key',
                        "Content-Type": 'application/json'
                    }}
            };
            const management = new Management(managementConfig.apiKey,managementConfig.customDomain);
            await testManagement(management.importRuleFlow.bind(management), args, managementConfig, sandbox);
        });

        it('should import rule flow with rule id', async () => {
            const args = [{name: 'MY RULE'}, 'fake-rule-id'];
            const managementConfig : ManagementConfig = {
                apiKey: 'fake-api-key',
                method: 'post',
                resStatus: 200,
                resData: {name: 'MY RULE'},
                expectedUrl: 'https://api.decisionrules.io:443/api/rule-flow/import/?new-version=fake-rule-id',
                expectedBody: {name: 'MY RULE'},
                expectedConfig: {headers: {
                        Authorization: 'Bearer fake-api-key',
                        "Content-Type": 'application/json'
                    }}
            };
            const management = new Management(managementConfig.apiKey,managementConfig.customDomain);
            await testManagement(management.importRuleFlow.bind(management), args, managementConfig, sandbox);
        });

        it('should import rule flow', async () => {
            const args = [{name: 'MY RULE'}];
            const managementConfig : ManagementConfig = {
                apiKey: 'fake-api-key',
                method: 'post',
                resStatus: 200,
                resData: {name: 'MY RULE'},
                expectedUrl: 'https://api.decisionrules.io:443/api/rule-flow/import',
                expectedBody: {name: 'MY RULE'},
                expectedConfig: {headers: {
                        Authorization: 'Bearer fake-api-key',
                        "Content-Type": 'application/json'
                    }}
            };
            const management = new Management(managementConfig.apiKey,managementConfig.customDomain);
            await testManagement(management.importRuleFlow.bind(management), args, managementConfig, sandbox);
        });
    });

    describe('changeRuleFlowStatus', () => {
        let sandbox: SinonSandbox;
        beforeEach(() => { sandbox = sinon.createSandbox();});
        afterEach(() => { sandbox.restore(); });

        it('should change rule status', async () => {
            const args = ['fake-rule-id', 'published', 2];
            const managementConfig : ManagementConfig = {
                apiKey: 'fake-api-key',
                method: 'put',
                resStatus: 200,
                resData: {name: 'MY RULE'},
                expectedUrl: 'https://api.decisionrules.io:443/api/rule-flow/status/fake-rule-id/published/2',
                expectedBody: 'undefined',
                expectedConfig: {headers: {
                        Authorization: 'Bearer fake-api-key',
                        "Content-Type": 'application/json'
                    }}
            };
            const management = new Management(managementConfig.apiKey,managementConfig.customDomain);
            await testManagement(management.changeRuleFlowStatus.bind(management), args, managementConfig, sandbox);
        });
    });

    // Tags

    describe('getRulesByTags', () => {
        let sandbox: SinonSandbox;
        beforeEach(() => { sandbox = sinon.createSandbox();});
        afterEach(() => { sandbox.restore(); });

        it('should get rules by tags', async () => {
            const args = [['PRODUCTION','TEST']];
            const managementConfig : ManagementConfig = {
                apiKey: 'fake-api-key',
                method: 'get',
                resStatus: 200,
                resData: [{name: 'MY PRODUCTION RULE'},{name: 'MY TEST RULE'}],
                expectedUrl: 'https://api.decisionrules.io:443/api/tags/items?tags=PRODUCTION,TEST',
                expectedConfig: {headers: {
                        Authorization: 'Bearer fake-api-key',
                        "Content-Type": 'application/json'
                    }}
            };
            const management = new Management(managementConfig.apiKey,managementConfig.customDomain);
            await testManagement(management.getRulesByTags.bind(management), args, managementConfig, sandbox);
        });
    });

    describe('updateTags', () => {
        let sandbox: SinonSandbox;
        beforeEach(() => { sandbox = sinon.createSandbox();});
        afterEach(() => { sandbox.restore(); });

        it('should update tags', async () => {
            const args = ['fake-rule-id', [{"tagName": "PRODUCTION", "color": "default"},{"tagName": "TEST", "color": "yellow"}]];
            const managementConfig : ManagementConfig = {
                apiKey: 'fake-api-key',
                method: 'patch',
                resStatus: 200,
                resData: {
                    "message": "ok"
                },
                expectedUrl: 'https://api.decisionrules.io:443/api/tags/fake-rule-id',
                expectedBody: [{"tagName": "PRODUCTION", "color": "default"},{"tagName": "TEST", "color": "yellow"}],
                expectedConfig: {headers: {
                        Authorization: 'Bearer fake-api-key',
                        "Content-Type": 'application/json'
                    }}
            };
            const management = new Management(managementConfig.apiKey,managementConfig.customDomain);
            await testManagement(management.updateTags.bind(management), args, managementConfig, sandbox);
        });

        it('should update tags with version', async () => {
            const args = ['fake-rule-id', [{"tagName": "PRODUCTION", "color": "default"},{"tagName": "TEST", "color": "yellow"}], 1];
            const managementConfig : ManagementConfig = {
                apiKey: 'fake-api-key',
                method: 'patch',
                resStatus: 200,
                resData: {
                    "message": "ok"
                },
                expectedUrl: 'https://api.decisionrules.io:443/api/tags/fake-rule-id/1',
                expectedBody: [{"tagName": "PRODUCTION", "color": "default"},{"tagName": "TEST", "color": "yellow"}],
                expectedConfig: {headers: {
                        Authorization: 'Bearer fake-api-key',
                        "Content-Type": 'application/json'
                    }}
            };
            const management = new Management(managementConfig.apiKey,managementConfig.customDomain);
            await testManagement(management.updateTags.bind(management), args, managementConfig, sandbox);
        });
    });

    describe('deleteTags', () => {
        let sandbox: SinonSandbox;
        beforeEach(() => { sandbox = sinon.createSandbox();});
        afterEach(() => { sandbox.restore(); });

        it('should delete tags', async () => {
            const args = ['fake-rule-id', ['PRODUCTION','TEST']];
            const managementConfig : ManagementConfig = {
                apiKey: 'fake-api-key',
                method: 'delete',
                resStatus: 200,
                resData: 200,
                expectedUrl: 'https://api.decisionrules.io:443/api/tags/fake-rule-id?tags=PRODUCTION,TEST',
                expectedConfig: {headers: {
                        Authorization: 'Bearer fake-api-key',
                        "Content-Type": 'application/json'
                    }}
            };
            const management = new Management(managementConfig.apiKey,managementConfig.customDomain);
            await testManagement(management.deleteTags.bind(management), args, managementConfig, sandbox);
        });

        it('should delete tags with version', async () => {
            const args = ['fake-rule-id', ['PRODUCTION','TEST'], 1];
            const managementConfig : ManagementConfig = {
                apiKey: 'fake-api-key',
                method: 'delete',
                resStatus: 200,
                resData: 200,
                expectedUrl: 'https://api.decisionrules.io:443/api/tags/fake-rule-id/1?tags=PRODUCTION,TEST',
                expectedConfig: {headers: {
                        Authorization: 'Bearer fake-api-key',
                        "Content-Type": 'application/json'
                    }}
            };
            const management = new Management(managementConfig.apiKey,managementConfig.customDomain);
            await testManagement(management.deleteTags.bind(management), args, managementConfig, sandbox);
        });
    });


});
