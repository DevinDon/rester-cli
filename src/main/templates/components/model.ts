export const MODEL = `/** {{NAME}} interface */
export interface {{NAME}} {

  author: string;

  content: string;

  timestamp: Date;

  like: number;

}

export type {{NAME}}ID = string;

export type {{NAME}}ParamInsert = Pick<{{NAME}}, 'author' | 'content' | 'timestamp'>;

export type {{NAME}}ParamUpdate = Pick<{{NAME}}, 'author' | 'content'>;
`;
