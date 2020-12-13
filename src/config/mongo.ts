import { join } from 'path';
import { ConnectionOptions } from 'typeorm';

const schemaFolder = join(__dirname, '..', 'schemas', '*{.ts,.js}');

export default {
  name: 'default',
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  database: process.env.MONGO_DB || 'IliaChallange',
  entities: [schemaFolder],
  useUnifiedTopology: true,
} as ConnectionOptions;
