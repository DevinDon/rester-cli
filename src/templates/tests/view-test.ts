import { readFileSync } from 'fs';
import { join } from 'path';

export const VIEWTEST = () => readFileSync(
  join(__dirname, 'templates', 'view-test.template'),
).toString();

export const VIEWSTEST = () => readFileSync(
  join(__dirname, 'templates', 'views-test.template'),
).toString();
