import {BaseType} from './DecisionBase';
import {RuleBase} from "./RuleBase.model";


export class ScriptRule extends RuleBase {
    type: BaseType.ComplexRule;
    script: any;
}
