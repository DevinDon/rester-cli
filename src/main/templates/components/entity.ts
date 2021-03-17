export const ENTITY = `import { BaseEntity, Column, Entity, Index, ObjectID, ObjectIdColumn } from 'typeorm';
import { {{NAME}} } from './{{name}}.model';

@Entity('{{name}}')
export class {{NAME}}Entity extends BaseEntity implements {{NAME}} {

  @ObjectIdColumn()
  _id!: ObjectID;

  @Column()
  @Index()
  author!: string;

  @Column()
  content!: string;

  @Column()
  timestamp!: Date;

  @Column({ default: 0 })
  like!: number;

}
`;
