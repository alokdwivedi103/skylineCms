import mongoose from 'mongoose';

const connectDB = async () => {
    console.log('inside connectDB')
  if (mongoose.connections[0].readyState) {
    return; // Already connected
  }

  try {
    const mongoURI = process.env.NEXT_PUBLIC_MONGO_URI as string;
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default connectDB;
