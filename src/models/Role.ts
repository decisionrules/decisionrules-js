export class Role {
    name: string;
    roleId: string;
    permissions: PermissionKey[];
}


export enum PermissionKey {
    // Decision Table
    DT_VIEW = 'DT_VIEW',
    DT_ADD_ROW = 'DT_ADD_ROW',
    DT_ADD_CONDITION = 'DT_ADD_CONDITION',
    DT_ADD_RESULT = 'DT_ADD_RESULT',
    DT_EDIT_CELL = 'DT_EDIT_CELL',
    DT_DELETE_ROW = 'DT_DELETE_ROW',
    DT_DELETE_CONDITION = 'DT_DELETE_CONDITION',
    DT_DELETE_RESULT = 'DT_DELETE_RESULT',
    DT_RENAME_CONDITION = 'DT_RENAME_CONDITION',
    DT_RENAME_RESULT = 'DT_RENAME_RESULT',
    DT_SET_VALID_VALUES = 'DT_SET_VALID_VALUES',
    DT_SET_FILTER = 'DT_SET_FILTER',
    DT_SORT = 'DT_SORT',

    // Scripting Rule
    SR_VIEW = 'SR_VIEW',

    // Decision Tree
    // todo doplnit pemisions
    TREE_VIEW = 'TREE_VIEW',
    TREE_ADD_NODE = 'TREE_ADD_NODE',
    TREE_EDIT_NODE = 'TREE_EDIT_NODE',
    TREE_EDIT_CONDITION = 'TREE_EDIT_CONDITION',
    TREE_DELETE_NODE = 'TREE_DELETE_NODE',
    TREE_MOVE_NODE = 'TREE_MOVE_NODE',
    TREE_DELETE_CONDITION = 'TREE_DELETE_CONDITION',
    TREE_MOVE_CONDITION = 'TREE_MOVE_CONDITION',
    TREE_CLONE_NODE = 'TREE_CLONE_NODE',

    // RULE
    RU_CREATE = 'RU_CREATE',
    RU_DELETE = 'RU_DELETE',
    RU_UPDATE = 'RU_UPDATE',
    RU_READ = 'RU_READ',
    RU_FORK = 'RU_FORK',
    RU_RENAME = 'RU_RENAME',
    RU_CLONE_TO_SPACE = 'RU_CLONE_TO_SPACE',
    RU_COPY_TO_SPACE = 'RU_COPY_TO_SPACE',
    RU_MOVE_TO_SPACE = 'RU_MOVE_TO_SPACE',
    RU_EXPORT = 'RU_EXPORT',
    RU_IMPORT = 'RU_IMPORT',
    RU_EDIT_INPUT_OUTPUT = 'RU_EDIT_INPUT_OUTPUT',
    RU_EDIT_DESCRIPTION = 'RU_EDIT_DESCRIPTION',
    RU_READ_SETTINGS = 'RU_READ_SETTINGS',
    RU_VIEW_HISTORY = 'RU_VIEW_HISTORY',
    RU_CHANGE_STATE = 'RU_CHANGE_STATE',
    RU_CHANGE_AUDIT = 'RU_CHANGE_AUDIT',

    // Rule Flow
    RF_CREATE = 'RF_CREATE',
    RF_UPDATE = 'RF_UPDATE',
    RF_DELETE = 'RF_DELETE',
    RF_READ = 'RF_READ',
    RF_FORK = 'RF_FORK',
    RF_RENAME = 'RF_RENAME',
    RF_EDIT_INPUT_OUTPUT = 'RF_EDIT_INPUT_OUTPUT',
    RF_EDIT_DESCRIPTION = 'RF_EDIT_DESCRIPTION',
    RF_READ_SETTINGS = 'RF_READ_SETTINGS',
    RF_CHANGE_MAPPING = 'RF_CHANGE_MAPPING',
    RF_DELETE_MAPPING = 'RF_DELETE_MAPPING',
    RF_CHANGE_GLOBAL_VARIABLE = 'RF_CHANGE_GLOBAL_VARIABLE',
    RF_ADD_START = 'RF_ADD_START',
    RF_ADD_END = 'RF_ADD_END',
    RF_ADD_RULE = 'RF_ADD_RULE',
    RF_CHANGE_RULE = 'RF_CHANGE_RULE',
    RF_CHANGE_STATE = 'RF_CHANGE_STATE',
    RF_EXPORT= 'RF_EXPORT',
    RF_IMPORT = 'RF_IMPORT',
    RF_CHANGE_AUDIT = 'RF_CHANGE_AUDIT',

    // TEST_BENCH
    TEST_BENCH_TEST = 'TEST_BENCH_TEST',

    // API KEY
    API_KEY_READ = 'API_KEY_READ',
    API_KEY_CREATE = 'API_KEY_CREATE',
    API_KEY_DELETE = 'API_KEY_DELETE',
    API_KEY_RENAME = 'API_KEY_RENAME',

    // SPACE
    SPACE_READ = 'SPACE_READ',
    SPACE_UPDATE = 'SPACE_UPDATE',
    SPACE_ADD_USER = 'SPACE_ADD_USER',
    SPACE_DELETE_USER = 'SPACE_DELETE_USER',
    SPACE_CHANGE_PERMISSION = 'SPACE_CHANGE_PERMISSION',
    SPACE_ADD_ROLE = 'SPACE_ADD_ROLE',
    SPACE_DELETE_ROLE = 'SPACE_DELETE_ROLE',
    SPACE_RENAME = 'SPACE_RENAME',
    SPACE_DELETE = 'SPACE_DELETE',
    SPACE_VIEW_USER = 'SPACE_VIEW_USER',
    SPACE_VIEW_INVITATIONS = 'SPACE_VIEW_INVITATIONS',
    SPACE_DELETE_INVITATIONS = 'SPACE_DELETE_INVITATIONS',
    SPACE_VIEW_ROLES = 'SPACE_VIEW_ROLES',

    // AUDIT
    AUDIT_READ = 'AUDIT_READ',
    AUDIT_DELETE = 'AUDIT_DELETE'
}


export enum PipeArg {
    NOT = 'NOT',
    AND = 'AND',
    OR = 'OR'
}
