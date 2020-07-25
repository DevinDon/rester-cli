import { writeFileSync } from 'fs';
import { mkdir } from 'shelljs';
import { CONTROLLER, ENTITY, MODEL, VIEW } from './template';

const base = 'src/main';

interface Params {
  lowercase: string;
  uppercase: string;
  folder: string;
}

export function generateComponent(name: string) {
  const lowercase = name.toLowerCase();
  const uppercase = lowercase
    .split('-')
    .map(part => part.slice(0, 1).toUpperCase() + part.slice(1))
    .join('');
  const folder = `${base}/${lowercase}`;
  mkdir(folder);
  const params: Params = { lowercase, uppercase, folder };
  generateModel(params);
  generateEntity(params);
  generateView(params);
  generateController(params);
}

export function generateModel({ lowercase, uppercase, folder }: Params) {
  writeFileSync(
    `${folder}/${lowercase}.model.ts`,
    MODEL
      .replace(/\{\{NAME\}\}/g, uppercase)
      .replace(/\{\{name\}\}/g, lowercase)
  );
}

export function generateEntity({ lowercase, uppercase, folder }: Params) {
  writeFileSync(
    `${folder}/${lowercase}.entity.ts`,
    ENTITY
      .replace(/\{\{NAME\}\}/g, uppercase)
      .replace(/\{\{name\}\}/g, lowercase)
  );
}

export function generateView({ lowercase, uppercase, folder }: Params) {
  writeFileSync(
    `${folder}/${lowercase}.view.ts`,
    VIEW
      .replace(/\{\{NAME\}\}/g, uppercase)
      .replace(/\{\{name\}\}/g, lowercase)
  );
}

export function generateController({ lowercase, uppercase, folder }: Params) {
  writeFileSync(
    `${folder}/${lowercase}.controller.ts`,
    CONTROLLER
      .replace(/\{\{NAME\}\}/g, uppercase)
      .replace(/\{\{name\}\}/g, lowercase)
  );
}
