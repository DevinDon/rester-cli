#!/usr/bin/env node
import { Command } from 'commander';

export const VERSION = '0.0.0';
export const program = new Command();

// describe this project
program
  .version(VERSION)
  .description('This is a template of command project with typescript.');

// tips of no such command, parse argv
program
  .on('command:*', () => {
    console.error(`No such command, see -h.`);
  })
  .parse(process.argv);
