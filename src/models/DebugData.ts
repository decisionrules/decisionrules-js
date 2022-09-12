import {DecisionTreeDebug} from "./DecisionTreeDebug";
import {DecisionTableDebug} from "./DecisionTableDebug";
import {CompositionDebug} from "./CompositionDebug";

export type DebugData = DecisionTreeDebug[] | DecisionTableDebug[] | CompositionDebug[] | string[];
