const mongoose = require("mongoose");

// Define Schema
const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  MobileNo: {
    type: String,
    required: true,
  },
  Designation: {
    type: String,
    required: true,
  },
  Gender: {
    type: String,
    required: true,
  },
  Course: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  image: {
    imagename:String,
    data:Buffer,
    content: String,
    size:Number
  },
});

const userData = mongoose.model("userDetails", userSchema);

module.exports = userData;
