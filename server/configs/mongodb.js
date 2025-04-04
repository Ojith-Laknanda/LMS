import mongoose from "mongoose";

//connet to mongodb database
const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log('MongoDB connected');
    });
    await mongoose.connect(`${process.env.MONGODB_URI}/LMS`, )//this is the connection string to connect to the database
}

//this is the function that will connect to the database and listen for the connection event
//and log the message to the console when connected

export default connectDB; //this will export the function to be used in other files

