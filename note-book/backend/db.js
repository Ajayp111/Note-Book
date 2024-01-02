const mongoose = require('mongoose');

// const URI = "mongodb://127.0.0.1:27017/inotebook";

mongoose.set('strictQuery', false);
const connectToMongo = () => {
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }).then(() => {
        console.log("Connected to MongoDB");
    }).catch(() => {
        console.log("Failed to connect to MongoDB");
    })
};

module.exports = connectToMongo;

