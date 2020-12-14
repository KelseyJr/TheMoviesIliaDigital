import { createConnection } from 'typeorm';
import mongoConfig from '../config/mongo';

createConnection({
  name: 'default',
  type: 'mongodb',
  host: mongoConfig.host,
  port: mongoConfig.port,
  database: mongoConfig.database,
  entities: mongoConfig.entities,
  useUnifiedTopology: true,
});
