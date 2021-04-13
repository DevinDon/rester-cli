export * from './handler';

import { readFileSync } from 'fs';
import { join } from 'path';

export const HANDLER_INDEX = () => readFileSync(
  join(__dirname, 'templates', 'handler-index.template'),
).toString();
