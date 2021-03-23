export const CONTROLLER = `import { BaseController, Controller, HTTP404Exception } from '@rester/core';
import { ObjectID } from 'mongodb';
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
      .insert({
        ...{{name}},
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .then(result => result.identifiers[0]);
    return this.repo.findOne(key);
  }

  async deleteOneByID(id: {{NAME}}ID) {
    const _id: any = new ObjectID(id);
    await this.repo.deleteOne({ _id });
    return [id];
  }

  async updateOne(id: {{NAME}}ID, {{name}}: {{NAME}}UpdateParams) {
    const _id: any = new ObjectID(id);
    await this.repo.updateOne({ _id }, { $set: { ...{{name}}, updatedAt: new Date() } });
    return this.repo.findOne({ _id });
  }

  async selectOneByID(id: {{NAME}}ID) {
    const _id: any = new ObjectID(id);
    return this.repo.findOneOrFail({ _id })
      .catch(() => { throw new HTTP404Exception('{{NAME}} not found.'); });
  }

  async selectManyByRandom(length: number) {
    return this.repo
      .aggregateEntity([{ $sample: { size: length } }])
      .toArray();
  }

}
`;
