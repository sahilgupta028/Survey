import mongoose, { ConnectOptions } from 'mongoose';

const connectMongo = async () => {
    console.log("Connection started");
    
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(process.env.NODE_ENV_MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export default connectMongo;
