import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.DB_SYNC === 'true',
  dropSchema: false,
  logging: process.env.TYPEORM_LOGGING === 'true' ? true : ['error'],
  migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true',
  autoLoadEntities: true,
  maxQueryExecutionTime: 500, // It will long when a query is executed more than 500 ms
  entities: [join(__dirname, '../', 'modules/**/entities/*.entity{.ts,.js}')],
};

export default config;
