import { Command } from 'commander';
import { generateComponent } from './function';
import { GenerateType } from './model';

export const VERSION = '0.10.12';
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
        console.log(`Generated ${name} component.`);
        break;
      default:
        console.warn(`Not support type ${type}`);
        break;
    }
  });

// tips of no such command, parse argv
program
  .on('command:*', () => {
    console.error('No such command, see -h.');
  })
  .parse(process.argv);
