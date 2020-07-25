export const MODEL = `
export interface {{NAME}} {

  id: number;

  content?: string;

}
`;

export const ENTITY = `
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { {{NAME}} } from './{{name}}.model';

@Entity('{{name}}')
export class {{NAME}}Entity extends BaseEntity implements {{NAME}} {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  content?: string;

}
`;

export const VIEW = `
import { DELETE, GET, Inject, PathVariable, POST, PUT, RequestBody, View } from '@rester/core';
import { {{NAME}}Controller } from './{{name}}.controller';
import { {{NAME}} } from './{{name}}.model';

// add, remove, modify, find(condition), get(random)
// one, more

@View('{{name}}')
export class {{NAME}}View {

  @Inject()
  private controller!: {{NAME}}Controller;

  @GET('{{id}}')
  async getOneByID(
    @PathVariable('id') id: number
  ) {
    return this.controller.selectOneByID(+id);
  }

}
`;

export const CONTROLLER = `
import { Controller } from '@rester/core';
import { {{NAME}} } from './{{name}}.model';
import { {{NAME}}Entity } from './{{name}}.entity';

// insert, delete, update, select
// one, more

@Controller()
export class {{NAME}}Controller {

  async selectOneByID(id: {{NAME}}['id']) {
    return {{NAME}}Entity.findOne(id);
  }

}`;
