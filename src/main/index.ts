#!/usr/bin/env node
import * as Commander from 'commander';
import { readFileSync } from 'fs';
import { dest as save, src as load } from 'gulp';
import * as replace from 'gulp-replace';
import { join, resolve } from 'path';
import { RegKey, RegVar } from './reg';

const ROOT = join(__dirname, '..');
const WORK = resolve('.');

const tempFiles = {
  cli: JSON.parse(readFileSync(join(ROOT, 'package.json')).toString()),
  dep: JSON.parse(readFileSync(join(ROOT, 'template/package.json')).toString())
};

const VERSION = {
  cli: tempFiles.cli.version,
  core: tempFiles.dep.dependencies['@rester/core'],
  typescript: tempFiles.dep.devDependencies.typescript
};

Commander
  .version(VERSION.cli)
  .command('version')
  .description('Show version of all Rester components.')
  .action(() => {
    console.log(`
  Rester CLI : ${VERSION.cli}
  Rester Core: ${VERSION.core}
  TypeScript : ${VERSION.typescript}
    `);
  });

Commander
  .command('new <name>')
  .alias('n')
  .description('Create a new rester project.')
  .action((name: string) => {
    load(join(ROOT, 'template/**/*'))
      .pipe(replace(RegVar.template, ((match: string, key: string) => {
        switch (key) {
          case RegKey.name: return name;
          default: return match;
        }
      }) as any))
      .pipe(save(join(WORK, name)));
    console.log(`
    Created project: ${name}
    `);
  });

Commander
  .on('command:*', args => console.error(`
  No such command: '${args}', see 'rs help' for more detail.
  `))
  .parse(process.argv);
