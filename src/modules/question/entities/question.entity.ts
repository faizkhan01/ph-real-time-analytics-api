import { GenericEntity } from 'src/modules/generic/generic.entity';
import { Quiz } from 'src/modules/quiz/entities/quiz.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Question extends GenericEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Quiz, (quiz) => quiz.id, { onDelete: 'CASCADE' })
  quiz_id: number;

  @Column()
  question_text: string;
}
