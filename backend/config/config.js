const mongoose = require('mongoose');

const uri = "";

async function connectDB() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB Atlas!");
    } catch (error) {
        console.error("Error connecting to MongoDB Atlas:", error);
        process.exit(1);
    }
}

module.exports = connectDB;
