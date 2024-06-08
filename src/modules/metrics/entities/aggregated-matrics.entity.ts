// entities/aggregated-metrics.entity.ts

import { GenericEntity } from 'src/modules/generic/generic.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class AggregatedMetrics extends GenericEntity {
  @Column({ default: 0 })
  totalScore: number;

  @Column({ default: 0 })
  totalEntries: number;

  @Column({ type: 'float', default: 0 })
  averageScore: number;

  @Column({ type: 'integer' })
  result_id: number;
}
