import mongoose from 'mongoose';
import { config } from '../config';

const connectionString = config.MONGODB_URL||"mongodb://localhost:27017/order";

class Database {
  constructor() {
    this.connect();
  }

  public connect() {
    if (1 === 1) {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }

    mongoose
      .connect(connectionString)
      .then(() => console.log('Connected to MongoDB  Success'))
      .catch((err) => console.log('Error Connect!',err));
  }

 
}

const database = new Database()

export default database;   
