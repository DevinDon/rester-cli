export const CONTROLLER = `import { BaseController, Controller } from '@rester/core';
import { getMongoRepository, MongoRepository } from 'typeorm';
import { {{NAME}}Entity } from './{{name}}.entity';
import { {{NAME}}ID, {{NAME}}InsertParams, {{NAME}}UpdateParams } from './{{name}}.model';

// insert, delete, update, select
// one, more

@Controller()
export class {{NAME}}Controller extends BaseController {

  private repo!: MongoRepository<{{NAME}}Entity>;

  async init() {
    this.repo = getMongoRepository({{NAME}}Entity);
  }

  async insertOne({{name}}: {{NAME}}InsertParams) {
    const key = await this.repo
      .insert({{name}})
      .then(result => result.identifiers[0]);
    return this.repo.findOne(key);
  }

  async deleteOneByID(_id: {{NAME}}ID) {
    await this.repo.delete({ _id });
    return [_id];
  }

  async updateOne(_id: {{NAME}}ID, {{name}}: {{NAME}}UpdateParams) {
    await this.repo.update(_id, {{name}});
    return this.repo.findOne(_id);
  }

  async selectOneByID(_id: {{NAME}}ID) {
    return this.repo.findOne(_id);
  }

  async selectManyByRandom(length: number) {
    return this.repo
      .aggregateEntity([{ $sample: { size: length } }])
      .toArray();
  }

}
`;
