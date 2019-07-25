#!/usr/bin/env node
import * as Commander from 'commander';
import { dest as save, src as load } from 'gulp';
import * as replace from 'gulp-replace';
import * as npm from 'npm';
import { join, resolve } from 'path';
import { RegKey, RegVar } from './reg';
import { getVersionOfGlobal, getVersionOfLocal } from './version';

const GLOBAL = join(__dirname, '..');
const LOCAL = resolve('.');

Commander
  .command('version')
  .description('Show version of all Rester components.')
  .action(() => {
    const global = getVersionOfGlobal();
    console.log(`
  === Global Version ===
  Rester CLI : ${global.cli}
  Rester Core: ${global.core}
  TypeScript : ${global.typescript}
    `);
    try {
      const local = getVersionOfLocal();
      console.log(`
  === Local Version ===
  Rester CLI : ${local.cli}
  Rester Core: ${local.core}
  TypeScript : ${local.typescript}
  `);
    } catch (err) { }
  });

Commander
  .command('new <name>')
  .alias('n')
  .description('Create a new rester project.')
  .action((name: string) => {
    load(join(GLOBAL, 'template/**/*'))
      .pipe(replace(RegVar.template, ((match: string, key: string) => {
        switch (key) {
          case RegKey.name: return name;
          default: return match;
        }
      }) as any))
      .pipe(save(join(LOCAL, name)));
    console.log(`
    Created project: ${name}
    `);
    npm.load({}, () => {
      npm.commands.install([], (err, data) => {
        console.error(err);
        console.log(data);
      });
    });
  });

Commander
  .command('test')
  .description('Run unit test of Rester project.')
  .action((name, option) => { });

Commander
  .on('command:*', args => console.error(`
  No such command: '${args}', see 'rs -h' for more detail.
  `))
  .parse(process.argv);
