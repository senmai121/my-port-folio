import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();  // โหลดค่า environment variables จาก .env

const mongoUri = process.env.MONGODB_URI

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(mongoUri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log("MongoDB connected successfully");
        } else {
            console.log("Already connected to MongoDB");
        }
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
};

// กำหนดการเชื่อมต่อ MongoDB
mongoose.connection.on('connected', () => {
    console.log("MongoDB connected with readyState: ", mongoose.connection.readyState);
});

mongoose.connection.on('error', (err) => {
    console.error("MongoDB connection error:", err);
});

mongoose.connection.on('disconnected', () => {
    console.log("MongoDB disconnected");
});

export default connectDB;