
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.error('❌ MONGO_URI is not defined in environment variables!');
            process.exit(1);
        }

        // ✅ Remove useNewUrlParser and useUnifiedTopology
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        
        // Add event listeners
        mongoose.connection.on('disconnected', () => {
            console.log('⚠️  MongoDB Disconnected');
        });

        mongoose.connection.on('error', (err) => {
            console.error(`❌ MongoDB Connection Error: ${err.message}`);
        });

    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;