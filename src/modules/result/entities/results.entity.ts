import { Entity, Column, ManyToOne } from 'typeorm';
import { GenericEntity } from 'src/modules/generic/generic.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Quiz } from 'src/modules/quiz/entities/quiz.entity';

@Entity()
export class Result extends GenericEntity {
  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  user_id: number;

  @ManyToOne(() => Quiz, (quiz) => quiz.id, { onDelete: 'CASCADE' })
  quiz_id: number;

  @Column()
  score: number;

  @Column('timestamptz')
  completed_at: Date;
}
