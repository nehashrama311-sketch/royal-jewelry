const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      console.log('⚠️  MONGODB_URI not found in .env file');
      console.log('📌 Running in in-memory mode (data will not persist after restart)');
      return false;
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected Successfully!`);
    console.log(`📍 Database Host: ${mongoose.connection.host}`);
    console.log(`💾 Database Name: ${mongoose.connection.name}`);
    return true;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.log('⚠️  Falling back to in-memory mode');
    return false;
  }
};

module.exports = connectDB;