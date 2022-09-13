import {BaseType} from './DecisionBase';
import {RuleBase} from "./RuleBase";


export class ScriptRule extends RuleBase {
    type: BaseType.ComplexRule;
    script: any;
}
