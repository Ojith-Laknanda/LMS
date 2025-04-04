import mongoose from "mongoose"; //this will import the mongoose module

const userSchema = new mongoose.Schema( //scema is a blueprint for the data that will be stored in the database
  //this is the schema for the user model
  {
    _id: { type: String, required: true }, //this is the id of the user
    name: { type: String, required: true }, //this is the name of the user
    email: { type: String, required: true }, //this is the email of the user
    imageUrl: { type: String, required: true }, //this is the image of the user
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course", //this is the reference to the course model
      },
    ],
  }, { timestamps: true } //this will add the createdAt and updatedAt fields to the schema
); //this is the schema for the user model

const User = mongoose.model("User", userSchema); //this is the model for the user collection

export default User; //this will export the user model to be used in other files 