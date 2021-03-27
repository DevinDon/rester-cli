export const ENTITY = `import { Column, Entity, MongoEntity, ObjectID, PaginationParam } from '@rester/orm';
import { {{NAME}}, {{NAME}}ID, {{NAME}}InsertParams, {{NAME}}UpdateParams } from './{{name}}.model';

@Entity({ name: '{{name}}' })
export class {{NAME}}Entity extends MongoEntity<{{NAME}}> implements {{NAME}} {

  @Column()
  _id: ObjectID;

  @Column({ index: true })
  author?: string;

  @Column()
  content: string;

  @Column()
  like: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  async getRandomList({ take }: Pick<PaginationParam, 'take'>) {
    return { list: await this.collection.aggregate([{ $sample: { size: take } }]).toArray() };
  }

  async insertOne({{name}}: {{NAME}}) {
    const id = await this.collection
      .insertOne({{name}})
      .then(result => result.insertedId);
    return this.collection.findOne({ _id: new ObjectID(id) });
  }

  async deleteOne(id: {{NAME}}ID) {
    await this.collection.deleteOne({ _id: new ObjectID(id) });
    return [id];
  }

  async updateOne(id: {{NAME}}ID, {{name}}: Partial<{{NAME}}>) {
    await this.collection.updateOne(
      { _id: new ObjectID(id) },
      { $set: {{name}} },
    );
    return this.collection.findOne({ _id: new ObjectID(id) });
  }

  async findOne(id: {{NAME}}ID) {
    return this.collection.findOne({ _id: new ObjectID(id) });
  }

}

export type {{NAME}}Collection = {{NAME}}Entity['collection'];
`;
