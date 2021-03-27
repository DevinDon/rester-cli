export const VIEW = `import { BaseView, cleanify, DELETE, ExistResponse, GET, PathVariable, POST, PUT, RequestBody, requiredAtLeastOneParam, requiredParams, ResterResponse, View } from '@rester/core';
import { getEntity } from '@rester/orm';
import { {{NAME}}Collection, {{NAME}}Entity } from './{{name}}.entity';
import { {{NAME}}ID, {{NAME}}InsertParams, {{NAME}}UpdateParams } from './{{name}}.model';

// create, remove, modify, take, search
// one, more

@View('{{name}}')
export class {{NAME}}View extends BaseView {

  private entity: {{NAME}}Entity;
  private collection: {{NAME}}Collection;

  async init() {
    this.entity = getEntity({{NAME}}Entity);
    this.collection = this.entity.collection;
  }

  @POST()
  async create(
    @RequestBody() { author, content }: {{NAME}}InsertParams,
  ) {
    requiredParams(content);
    return new ResterResponse({
      statusCode: 201,
      data: await this.entity.insertOne({
        author,
        content,
        like: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    });
  }

  @DELETE(':id')
  async remove(@PathVariable('id') id: {{NAME}}ID) {
    return this.entity.deleteOne(id);
  }

  @PUT(':id')
  async modify(
    @PathVariable('id') id: {{NAME}}ID,
    @RequestBody() { author, content }: {{NAME}}UpdateParams,
  ) {
    requiredAtLeastOneParam(author, content);
    return new ExistResponse({
      data: await this.entity.updateOne(id, cleanify({ author, content, updateAt: new Date() })),
      message: '{{NAME}} not found.',
    });
  }

  @GET(':id')
  async take(
    @PathVariable('id') id: {{NAME}}ID,
  ) {
    return new ExistResponse({
      data: await this.entity.findOne(id),
      message: '{{NAME}} not found.',
    });
  }

}
`;

export const VIEWS = `import { BaseView, GET, PathQuery, View } from '@rester/core';
import { getEntity, Pagination } from '@rester/orm';
import { {{NAME}}Collection, {{NAME}}Entity } from './{{name}}.entity';

// create, remove, modify, take, search
// one, more

@View('{{name}}s')
export class {{NAME}}sView extends BaseView {

  private entity: {{NAME}}Entity;
  private collection: {{NAME}}Collection;

  async init() {
    this.entity = getEntity({{NAME}}Entity);
    this.collection = this.entity.collection;
  }

  @GET()
  async take(
    @PathQuery('random') random: boolean = false,
    @PathQuery('from') from: string = '000000000000000000000000',
    @PathQuery('take') take: number = 10,
  ): Promise<Pagination<string>> {
    return random
      ? this.entity.getRandomList({ take })
      : this.entity.getPagination({ from, take });
  }

}
`;
