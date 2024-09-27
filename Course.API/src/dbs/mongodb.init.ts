import mongoose from 'mongoose';
import { config } from '../config';
const connectionString:string = config.MONGODB_URL||"mongodb://localhost:27011/coursedb";
class Database {
  static instance: Database;
  constructor() {
    this.connect();
  }

  connect() {
    if (1 === 1) {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }

    mongoose
      .connect(connectionString)
      .then(() => console.log('Connected to MongoDB  Success'))
      .catch((err) => console.log('Error Connect!',err));
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
