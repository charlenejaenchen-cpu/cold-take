// --- DEPOENDENCIES ---
import mongoose from 'mongoose';


// --- DATABASE SET UP ---

// Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Database connected');
    } catch (err) {
        console.log(err);
    }
};

// Export
export default connectDB;




