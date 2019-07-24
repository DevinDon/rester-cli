#!/usr/bin/env node
import * as Commander from 'commander';
import { readFileSync } from 'fs';
import { join } from 'path';

const version = JSON.parse(readFileSync(join(__dirname, '../package.json')).toString()).version;

Commander
  .version(version)
  .command('version')
  .description('Show version of all Rester components.')
  .action(() => {
    console.log(`CLI Version: ${version}`);
  });

Commander
  .on('command:*', args => console.error(`No such command: '${args}', see 'rs help' for more detail.`))
  .parse(process.argv);
