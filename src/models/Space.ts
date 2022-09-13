import {ApiKey} from "./ApiKey";
import {Role} from "./Role";
import {Tag} from "./Tag";

export class Space {
    name?: string;
    _id?: string;
    spaceId?: string;
    ruleIds?: string[];
    compositionIds?: string[];
    users?: SpaceUser[];
    apiKeys?: ApiKey[];
    totalApiKeys?: number;
    userId: string;
    rules?: number;
    compositions?: number;
    createdIn?: Date;
    lastUpdate?: Date;
    roles?: Role[];
    tags?: Tag[];
}

export class SpaceUser{
    userId: string;
    permissions?: UserPermissions[];
    roleId?: string;
}

export enum UserPermissions {
    ADMIN = 'admin',
    WRITE = 'write',
    READ = 'read'
}

export class InvitationModel{
    _id?: string;
    spaceId: string;
    email: string;
    state?: InvitationState
    expiresIn?: number;
    roleId?: string
}

export enum InvitationState {
    PENDING = 'pending',
    ACCEPT = 'accept',
    EXPIRED = 'expired'
}
