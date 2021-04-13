import { readFileSync } from 'fs';
import { join } from 'path';

export const MODEL = () => readFileSync(
  join(__dirname, 'templates', 'model.template'),
).toString();
