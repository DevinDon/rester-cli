export * from './entity';
export * from './model';
export * from './view';

export const COMPONENT_INDEX = `import { ResterModule } from '@rester/core';
import { {{NAME}}Entity } from './{{name}}.entity';
import { {{NAME}}View } from './{{name}}.view';
import { {{NAME}}sView } from './{{name}}s.view';

export const {{NAME}}Module: ResterModule = {
  entities: [{{NAME}}Entity],
  views: [{{NAME}}View, {{NAME}}sView],
};
`;
