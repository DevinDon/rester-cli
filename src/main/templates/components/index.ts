export * from './controller';
export * from './entity';
export * from './model';
export * from './view';

export const COMPONENT_INDEX = `export * from './{{name}}.controller';
export * from './{{name}}.entity';
export * from './{{name}}.model';
export * from './{{name}}.view';
export * from './{{name}}.views';
`;
