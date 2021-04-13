import { readFileSync } from 'fs';
import { join } from 'path';

export const HANDLER = () => readFileSync(
  join(__dirname, 'templates', 'handler.template'),
).toString();
