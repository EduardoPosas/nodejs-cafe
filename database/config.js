import mongoose from 'mongoose';

const mongoDbConn = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONN);
    console.log('MongoDb connection established');
  } catch (error) {
    throw new Error('Failed to connect to MongoDb')
  }
}

export {
  mongoDbConn
}