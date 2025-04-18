// import express from 'express'; //this will import the express module
// import cors from 'cors';
// import 'dotenv/config';
// import connectDB from './configs/mongodb.js'; //this will import the function to connect to the database
// import { clerkUserWebhook } from './controllers/webhooks.js';

// //intialize express app
// const app = express(); // this will create an instance of express

// //database connection
// await connectDB(); //this will connect to the database

// //middleware
// app.use(cors());

// //routes
// app.get('/', (req, res) => {
//     res.send('API working');
// }); //localhost:5000 this is for the home page

// app.post('/clerk',express.json(),clerkUserWebhook); 
// //this is the route for the clerk webhook that will handle the requests from the clerk and send it to the controller function to handle the requests


// // port
// const PORT = process.env.PORT || 5000; //if the port is not defined in the env file then use 5000

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// }); //this will run the server on the port defined in the env file or 5000 if not defined
// //this is the main file that will run the server and listen to the requests

import express from 'express'; //this will import the express module
import cors from 'cors'; //this will import the cors module
import 'dotenv/config'; //this will import the environment variables
import connectDB from './configs/mongodb.js'; //this will import the function to connect to the database
import { clerkUserWebhook } from './controllers/webhooks.js'; //this will import the controller function for the clerk webhook

const app = express(); // this will create an instance of express

const startServer = async () => { // define an async function to start the server
  try {
    await connectDB(); // Connect to the database

    app.use(cors()); //this will set up the CORS middleware to allow cross-origin requests

    app.get('/', (req, res) => { // route for the home page
      res.send('API working'); //this will send a response indicating the API is working
    });

    app.post('/clerk', express.json(), clerkUserWebhook); //this is the route for the clerk webhook that will handle requests from the clerk and send it to the controller function for processing

    const PORT = process.env.PORT || 5000; //if the port is not defined in the env file, it will default to 5000
    app.listen(PORT, () => { //start the server on the specified port
      console.log(`Server running on port ${PORT}`); //this will log a message indicating the server is running
    });
  } catch (error) {
    console.error('Error starting server:', error); //this will log any errors if the server fails to start
  }
};

startServer(); //call the async function to start the server






