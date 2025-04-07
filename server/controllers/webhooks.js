import { Webhook } from "svix"; // svix is a library that helps you verify and decode webhooks from clerk ,Svix is a webhook service platform that helps you send, manage, and secure webhooks from your application to other services or clients.
// It provides a way to handle webhook events, ensuring that they are sent securely and reliably.
import User from "../models/User.js";

//api controllwe function to manage clerk uwer with database
export const clerkUserWebhook = async (req, res) => { //this is the function that will handle the webhook from clerk that can access the user data from the database
    try {
        const wh= new Webhook(process.env.CLERK_WEBHOOK_SECRET); //this will create a new instance of the webhook class with the secret key from the env file
        console.log('Verifying webhook...');
        await wh.verify(JSON.stringify(req.body),{
            "svix-id": req.headers["svix-id"], //this is the id of the webhook
            "svix-timestamp": req.headers["svix-timestamp"], //this is the timestamp of the webhook
            "svix-signature": req.headers["svix-signature"] //this is the signature of the webhook
        }),
        console.log('Webhook verified!');
        const {data,type} = req.body; //this will destructure the data and type from the request body
        //this will check if the type of the webhook is user.created or user.updated or user.deleted
        switch (type) {
            case 'user.created':
                {
                    const userData = {
                        _id: data.id, //this is the id of the user
                        email: data.email_addresses[0].email_address, //this is the email of the user
                        name: data.first_name + " " + data.last_name, //this is the name of the user
                        imageUrl: data.image_url, //this is the image of the user
                    }
                    await User.create(userData); //this will create a new user in the database
                    res.status(200).json({ success: true })

                    break;
                }
                
            case 'user.updated':{
                const userData = {
                    name: data.first_name + " " + data.last_name, //this is the name of the user
                    email: data.email_addresses[0].email_address, //this is the email of the user
                    imageUrl: data.image_url, //this is the image of the user
                }
                await User.findByIdAndUpdate(data.id , userData); //this will update the user in the database
                res.status(200).json({ success: true })

                break;
            }

            case 'user.deleted':{
                await User.findByIdAndDelete(data.id); //this will delete the user from the database
                res.json({})
                break;
            }
        
            default:
                break;
        }
    } catch (error) {
        res.json({success:false,message:error.message}) //this will send the error message if there is any error
        
    }
}

/*
Verify the Webhook Is Legit (Using Svix)
const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
await wh.verify(JSON.stringify(req.body), {
    "svix-id": req.headers["svix-id"],
    "svix-timestamp": req.headers["svix-timestamp"],
    "svix-signature": req.headers["svix-signature"]
});

CLERK_WEBHOOK_SECRET: A secret key from your .env file. Only you and Clerk know this, so it keeps your webhooks safe.

wh.verify(...): This checks if the webhook is really from Clerk and not some random hacker.
*/

/*
Get Event Type and Data

const { data, type } = req.body;

    type: tells us what happened — like user.created, user.updated, or user.deleted

    data: contains info about the user (name, email, image, etc.)
*/