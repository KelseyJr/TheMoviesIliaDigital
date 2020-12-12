import { ConnectionOptions } from 'typeorm';

export default {
  name: process.env.MONGO_NAME || 'default',
  type: 'mongodb',
  host: process.env.MONGO_HOST || 'localhost',
  port: process.env.MONGO_PORT || 27017,
  database: process.env.MONGO_DB || 'IliasKelseyTeste',
  entities: ['./schemas/*.ts'],
  useUnifiedTopology: true,
} as ConnectionOptions;
