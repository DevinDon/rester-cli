import { readFileSync } from 'fs';
import { join } from 'path';

export const ENTITY = () => readFileSync(
  join('templates', 'entity.template'),
).toString();
