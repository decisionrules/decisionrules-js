export class TagModel {
    tagName: string;
    color?: TagColor;
}

export enum TagColor {
    DEFAULT = 'default',
    GRAY = 'gray',
    VIOLET = 'violet',
    YELLOW = 'yellow',
    GREEN = 'green',
    RED = 'red',
    WHITE = 'white'
}
