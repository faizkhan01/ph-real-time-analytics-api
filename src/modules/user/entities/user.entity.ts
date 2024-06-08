import { GenericEntity } from 'src/modules/generic/generic.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class User extends GenericEntity {
  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;
}
