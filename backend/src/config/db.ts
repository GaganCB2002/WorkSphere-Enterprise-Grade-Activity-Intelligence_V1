import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    if (mongoose.connection.readyState === 1) {
      console.log(`[DATABASE] MongoDB Connected: ${conn.connection.host || '127.0.0.1'}`);
    } else {
      throw new Error('Connection initiated but not fully established');
    }
  } catch (error: any) {
    console.warn(`[DATABASE] MongoDB connection failed: ${error.message}. Continuing in limited mode.`);
  }
};

export default connectDB;
