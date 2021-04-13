import { readFileSync } from 'fs';
import { join } from 'path';

export const VIEWTEST = () => readFileSync(
  join('templates', 'view-test.template'),
).toString();

export const VIEWSTEST = () => readFileSync(
  join('templates', 'views-test.template'),
).toString();
