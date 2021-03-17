export const VIEW = `import { BaseView, DELETE, GET, Inject, PathVariable, POST, PUT, RequestBody, requiredParams, View } from '@rester/core';
import { {{NAME}}Controller } from './{{name}}.controller';
import { {{NAME}}ID, {{NAME}}InsertParams, {{NAME}}UpdateParams } from './{{name}}.model';

// create, remove, modify, take, search
// one, more

@View('{{name}}')
export class {{NAME}}View extends BaseView {

  @Inject()
  private controller!: {{NAME}}Controller;

  @POST()
  async create(
    @RequestBody() { author, content, timestamp = new Date() }: {{NAME}}InsertParams,
  ) {
    requiredParams(author, content, timestamp);
    return this.controller.insertOne({ author, content, timestamp });
  }

  @DELETE(':id')
  async remove(@PathVariable('id') id: {{NAME}}ID) {
    return this.controller.deleteOneByID(id);
  }

  @PUT(':id')
  async modify(
    @PathVariable('id') id: {{NAME}}ID,
    @RequestBody() { author, content, timestamp }: {{NAME}}UpdateParams,
  ) {
    return this.controller.updateOne(id, { author, content, timestamp });
  }

  @GET(':id')
  async take(
    @PathVariable('id') id: {{NAME}}ID,
  ) {
    return this.controller.selectOneByID(id);
  }

}
`;

export const VIEWS = `import { BaseView, GET, getPagination, Inject, Pagination, PathQuery, View } from '@rester/core';
import { getMongoRepository, MongoRepository } from 'typeorm';
import { {{NAME}}Controller } from './{{name}}.controller';
import { {{NAME}}Entity } from './{{name}}.entity';

// create, remove, modify, take, search
// one, more

@View('{{name}}')
export class {{NAME}}sView extends BaseView {

  @Inject()
  private controller!: {{NAME}}Controller;

  private repo!: MongoRepository<{{NAME}}Entity>;

  async init() {
    this.repo = getMongoRepository({{NAME}}Entity);
  }

  @GET()
  async take(
    @PathQuery('random') random: boolean = false,
    @PathQuery('from') from: string = '000000000000000000000000',
    @PathQuery('take') take: number = 10,
  ): Promise<Pagination<string>> {
    return random
      ? { list: await this.controller.selectManyByRandom(take) }
      : getPagination(this.repo, { from, take });
  }

}
`;
