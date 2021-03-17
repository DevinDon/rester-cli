export const VIEW = `import { BaseView, DELETE, GET, Handler, Inject, PathVariable, POST, PUT, RequestBody, requiredParamsInFields, View } from '@rester/core';
import { AccessHandler } from '../common/handlers';
import { {{NAME}}Controller } from './{{name}}.controller';
import { {{NAME}}, {{NAME}}ID, {{NAME}}ParamInsert } from './{{name}}.model';

// create, remove, modify, take, search
// one, more

@View('{{name}}')
@Handler(AccessHandler)
export class {{NAME}}View extends BaseView {

  @Inject()
  private controller!: {{NAME}}Controller;

  @POST()
  async create(
    @RequestBody() {{name}}: {{NAME}}ParamInsert,
  ) {
    requiredParamsInFields({{name}}, ['author', 'content']);
    return this.controller.insertOne({
      author: {{name}}.author,
      content: {{name}}.content,
      timestamp: new Date(),
    });
  }

  @DELETE(':id')
  async remove(@PathVariable('id') id: {{NAME}}ID) {
    return this.controller.deleteOneByID(id);
  }

  @PUT(':id')
  async modify(
    @PathVariable('id') id: {{NAME}}ID,
    @RequestBody() {{name}}: {{NAME}},
  ) {
    const update: Pick<{{NAME}}, 'author' | 'content'> = {
      author: {{name}}.author,
      content: {{name}}.content,
    };
    return this.controller.updateOne(id, update);
  }

  @GET(':id')
  async take(
    @PathVariable('id') id: {{NAME}}ID,
  ) {
    return this.controller.selectOneByID(id);
  }

}
`;

export const VIEWS = `import { BaseView, GET, getPagination, Handler, Inject, Pagination, PathQuery, View } from '@rester/core';
import { getMongoRepository, MongoRepository } from 'typeorm';
import { AccessHandler } from '../common/handlers';
import { {{NAME}}Controller } from './{{name}}.controller';
import { {{NAME}}Entity } from './{{name}}.entity';

// create, remove, modify, take, search
// one, more

@View('{{name}}s')
@Handler(AccessHandler)
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
