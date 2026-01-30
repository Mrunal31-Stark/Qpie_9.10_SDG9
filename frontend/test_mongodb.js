import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ai-patent-analyzer';

console.log('=== MongoDB Connection Diagnostic ===\n');
console.log('MongoDB URI:', MONGO_URI);
console.log('Attempting connection...\n');

// Set a shorter timeout for faster diagnosis
mongoose.set('serverSelectionTimeoutMS', 5000);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ SUCCESS: MongoDB connected!');
    console.log('Database name:', mongoose.connection.name);
    console.log('Connection state:', mongoose.connection.readyState);
    console.log('\nYour MongoDB is working correctly!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ FAILED: Could not connect to MongoDB\n');
    console.error('Error:', err.message);
    console.error('\nPossible solutions:');
    console.error('1. Start MongoDB service: net start MongoDB');
    console.error('2. Check if MongoDB is installed');
    console.error('3. Verify MongoDB is running on port 27017');
    process.exit(1);
  });
