import { readFileSync } from 'fs';
import { join } from 'path';

export const ENTITY = () => readFileSync(
  join(__dirname, 'templates', 'entity.template'),
).toString();
