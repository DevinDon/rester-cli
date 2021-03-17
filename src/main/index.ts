import { logger } from '@iinfinity/logger';
import { Command } from 'commander';
import { generateComponent, generateHandler } from './generators';
import { GenerateType } from './model';

export const VERSION = require('../../package.json').version;
export const program = new Command();

// describe this project
program
  .version(VERSION)
  .description('Rester Framework Command-Line Interface.');

// generate
program
  .command('generate <type> <name>')
  .alias('g')
  .description('Generate component/handler and so on.')
  .action((type: GenerateType, name: string) => {
    switch (type) {
      case 'component':
      case 'c':
        generateComponent(name);
        logger.info(`Generated ${name} component.`);
        break;
      case 'handler':
      case 'h':
        generateHandler(name);
        logger.info(`Generated ${name} handler.`);
        break;
      default:
        logger.warn(`Not support type ${type}`);
        break;
    }
  });

// tips of no such command, parse argv
program
  .on('command:*', () => {
    logger.error('No such command, see -h.');
  })
  .parse(process.argv);
