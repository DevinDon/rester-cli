import { readFileSync } from 'fs';
import { join } from 'path';

export const HANDLER = () => readFileSync(
  join('templates', 'handler.template'),
).toString();
