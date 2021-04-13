export * from './entity';
export * from './model';
export * from './view';

import { readFileSync } from 'fs';
import { join } from 'path';

export const COMPONENT_INDEX = () => readFileSync(
  join('templates', 'component-index.template'),
).toString();
