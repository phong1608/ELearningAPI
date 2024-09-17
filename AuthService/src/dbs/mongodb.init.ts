import mongoose from 'mongoose';
import { config } from '../../config';

const connectionString = config.MONGODB_URL||"mongodb://localhost:27017/user";

class Database {
  static instance: Database;
  constructor() {
    this.connect();
  }

  connect(type: 'mongodb' = 'mongodb') {
    if (1 === 1) {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }

    mongoose
      .connect(connectionString)
      .then(() => console.log('Connected to MongoDB  Success'))
      .catch((err) => console.log('Error Connect!'));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongoDb   
 = Database.getInstance();

export default instanceMongoDb;   
