export const MODEL = `export interface {{NAME}} {

  author?: string;

  content: string;

  timestamp: Date;

  like: number;

}

export type {{NAME}}ID = string;

export type {{NAME}}InsertParams = Pick<{{NAME}}, 'content'> & Partial<Pick<{{NAME}}, 'author' | 'timestamp'>>;

export type {{NAME}}UpdateParams = {{NAME}}InsertParams;
`;
