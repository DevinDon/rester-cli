import { readFileSync } from 'fs';
import { join } from 'path';

export const VIEW = () => readFileSync(
  join('templates', 'view.template'),
).toString();

export const VIEWS = () => readFileSync(
  join('templates', 'views.template'),
).toString();
