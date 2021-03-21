import { existsSync, writeFileSync } from 'fs';
import { mkdir } from 'shelljs';
import { BASE } from '../constants';
import { COMPONENT_INDEX, CONTROLLER, ENTITY, MODEL, VIEW, VIEWS } from '../templates';

interface Params {
  lowercase: string;
  uppercase: string;
  folder: string;
}

export const generateComponent = (name: string) => {
  const lowercase = name.toLowerCase();
  const uppercase = lowercase
    .split('-')
    .map(part => part.slice(0, 1).toUpperCase() + part.slice(1))
    .join('');
  const folder = `${BASE}/${lowercase}`;
  if (existsSync(folder)) {
    throw new Error(`Folder ${BASE} has already existed.`);
  }
  mkdir('-p', folder);
  const params: Params = { lowercase, uppercase, folder };
  generateComponentModel(params);
  generateComponentEntity(params);
  generateComponentView(params);
  generateComponentController(params);
  generateComponentIndex(params);
};

export const generateComponentModel = ({ lowercase, uppercase, folder }: Params) => {
  writeFileSync(
    `${folder}/${lowercase}.model.ts`,
    MODEL
      .replace(/\{\{NAME\}\}/g, uppercase)
      .replace(/\{\{name\}\}/g, lowercase),
  );
};

export const generateComponentEntity = ({ lowercase, uppercase, folder }: Params) => {
  writeFileSync(
    `${folder}/${lowercase}.entity.ts`,
    ENTITY
      .replace(/\{\{NAME\}\}/g, uppercase)
      .replace(/\{\{name\}\}/g, lowercase),
  );
};

export const generateComponentView = ({ lowercase, uppercase, folder }: Params) => {
  writeFileSync(
    `${folder}/${lowercase}.view.ts`,
    VIEW
      .replace(/\{\{NAME\}\}/g, uppercase)
      .replace(/\{\{name\}\}/g, lowercase),
  );
  writeFileSync(
    `${folder}/${lowercase}s.view.ts`,
    VIEWS
      .replace(/\{\{NAME\}\}/g, uppercase)
      .replace(/\{\{name\}\}/g, lowercase),
  );
};

export const generateComponentController = ({ lowercase, uppercase, folder }: Params) => {
  writeFileSync(
    `${folder}/${lowercase}.controller.ts`,
    CONTROLLER
      .replace(/\{\{NAME\}\}/g, uppercase)
      .replace(/\{\{name\}\}/g, lowercase),
  );
};

export const generateComponentIndex = ({ lowercase, uppercase, folder }: Params) => {
  writeFileSync(
    `${folder}/index.ts`,
    COMPONENT_INDEX
      .replace(/\{\{NAME\}\}/g, uppercase)
      .replace(/\{\{name\}\}/g, lowercase),
  );
};
