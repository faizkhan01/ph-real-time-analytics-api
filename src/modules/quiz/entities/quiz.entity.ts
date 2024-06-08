import { GenericEntity } from 'src/modules/generic/generic.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Quiz extends GenericEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;
}
