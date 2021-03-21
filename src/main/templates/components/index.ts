export * from './controller';
export * from './entity';
export * from './model';
export * from './view';

export const COMPONENT_INDEX = `import { ResterModule } from '@rester/core';
import { {{NAME}}Controller } from './{{name}}.controller';
import { {{NAME}}Entity } from './{{name}}.entity';
import { {{NAME}}View } from './{{name}}.view';
import { {{NAME}}sView } from './{{name}}s.view';

export const {{NAME}}Module: ResterModule = {
  entities: [{{NAME}}Entity],
  controllers: [{{NAME}}Controller],
  views: [{{NAME}}View, {{NAME}}sView],
};
`;
