const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // e.g., MONGO_URI="mongodb://127.0.0.1:27017/myapp"
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully.');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = { connectDB };
