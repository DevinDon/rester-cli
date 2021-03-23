export const VIEW = `import { BaseResponse, BaseView, cleanify, DELETE, GET, Inject, PathVariable, POST, PUT, RequestBody, requiredAtLeastOneParam, requiredParams, View } from '@rester/core';
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
    @RequestBody() { author, content }: {{NAME}}InsertParams,
  ) {
    requiredParams(content);
    return new BaseResponse({
      statusCode: 201,
      data: await this.controller.insertOne({ author, content }),
    });
  }

  @DELETE(':id')
  async remove(@PathVariable('id') id: {{NAME}}ID) {
    return this.controller.deleteOneByID(id);
  }

  @PUT(':id')
  async modify(
    @PathVariable('id') id: {{NAME}}ID,
    @RequestBody() { author, content }: {{NAME}}UpdateParams,
  ) {
    requiredAtLeastOneParam(author, content);
    return this.controller.updateOne(id, cleanify({ author, content }));
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

@View('{{name}}s')
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
