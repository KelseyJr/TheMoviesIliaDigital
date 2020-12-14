import { join } from 'path';

const schemaFolder = join(__dirname, '..', 'schemas', '*{.ts,.js}');

interface IMongoConfig {
  host: string;
  port: number;
  database: string;
  entities: string[];
}

export default {
  host: process.env.MONGO_URL || 'localhost',
  port: process.env.MONGO_PORT || 27017,
  database: process.env.MONGO_DB || 'IliaChallange',
  entities: [schemaFolder],
} as IMongoConfig;
