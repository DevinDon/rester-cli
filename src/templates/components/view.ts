import { readFileSync } from 'fs';
import { join } from 'path';

export const VIEW = () => readFileSync(
  join(__dirname, 'templates', 'view.template'),
).toString();

export const VIEWS = () => readFileSync(
  join(__dirname, 'templates', 'views.template'),
).toString();
