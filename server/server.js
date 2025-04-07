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

 





import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import { clerkUserWebhook } from './controllers/webhooks.js';

const app = express();

const startServer = async () => {
  try {
    await connectDB(); // Connect to DB

    app.use(cors());

    app.get('/', (req, res) => {
      res.send('API working');
    });

    app.post('/clerk', express.json(), clerkUserWebhook);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer(); // call the async function
