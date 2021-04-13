import { readFileSync } from 'fs';
import { join } from 'path';

export const MODEL = () => readFileSync(
  join('templates', 'model.template'),
).toString();
