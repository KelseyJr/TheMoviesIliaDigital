import { createConnection } from 'typeorm';
import mongoConfig from '../config/mongo';

createConnection(mongoConfig);
