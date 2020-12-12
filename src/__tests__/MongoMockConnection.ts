import { createConnection, Connection } from 'typeorm';
import { join } from 'path';

const schemaFolder = join(__dirname, '..', 'schemas', '*.ts');

class MongoMock {
  private database: Connection;

  async connect(): Promise<void> {
    this.database = await createConnection({
      type: 'mongodb',
      url: process.env.MONGO_URL,
      name: 'default',
      useUnifiedTopology: true,
      entities: [schemaFolder],
    });
  }

  disconnect(): Promise<void> {
    return this.database.close();
  }
}

export default new MongoMock();
