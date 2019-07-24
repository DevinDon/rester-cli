import { existsSync, readFileSync } from 'fs';
import { join, resolve } from 'path';

export interface ResterVersion {
  cli: string;
  core: string;
  typescript: string;
}

const GLOBAL = join(__dirname, '..');
const LOCAL = resolve('.');

export function getVersionOfGlobal(): ResterVersion {
  const json = JSON.parse(readFileSync(join(GLOBAL, 'template/package.json')).toString());
  return {
    cli: json.devDependencies['@rester/cli'],
    core: json.dependencies['@rester/core'],
    typescript: json.devDependencies.typescript
  };
}

export function getVersionOfLocal(): ResterVersion {
  if (existsSync(join(LOCAL, 'package.json'))) {
    const json = JSON.parse(readFileSync(join(LOCAL, 'package.json')).toString());
    return {
      cli: json.devDependencies['@rester/cli'],
      core: json.dependencies['@rester/core'],
      typescript: json.devDependencies.typescript
    };
  } else {
    throw new Error('Not in a rester project.');
  }
}
