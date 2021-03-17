import { appendFileSync, existsSync, writeFileSync } from 'fs';
import { mkdir } from 'shelljs';
import { BASE } from '../constants';
import { HANDLER, HANDLER_INDEX } from '../templates';

export const generateHandler = (name: string) => {
  const lowercase = name.toLowerCase();
  const uppercase = lowercase
    .split('-')
    .map(part => part.slice(0, 1).toUpperCase() + part.slice(1))
    .join('');
  const folder = `${BASE}/common/handlers`;
  if (!existsSync(folder)) {
    mkdir('-p', folder);
  }
  const file = `${folder}/${lowercase}.handler.ts`;
  if (existsSync(file)) {
    throw new Error(`${uppercase}Handler has alreay existed`);
  }
  writeFileSync(
    file,
    HANDLER
      .replace(/\{\{NAME\}\}/g, uppercase)
      .replace(/\{\{name\}\}/g, lowercase),
  );
  appendFileSync(
    `${folder}/index.ts`,
    HANDLER_INDEX
      .replace(/\{\{NAME\}\}/g, uppercase)
      .replace(/\{\{name\}\}/g, lowercase),
  );
};
