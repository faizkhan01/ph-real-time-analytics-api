import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

export abstract class GenericEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @CreateDateColumn({ name: 'created_at', select: false, type: 'timestamptz' })
  public createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false, type: 'timestamptz' })
  public updatedAt!: Date;
}
