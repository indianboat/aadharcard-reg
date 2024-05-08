import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: [true, "Please provide name"]
  },
  lname: {
    type: String,
    default: ""
  },
  mobile: {
    type: String,
    required: [true, "Please provide mobile number"],
    unique: [true, "mobile number should be unique"],
    minlength: [10, "please enter valid mobile number"],
    maxlength: [10, "please enter valid mobile number"]
  },
  dob: {
    type: Date,
    required: [true, "Please provide date of birth"]
  },
  gender: {
    type: String,
    required: [true, "Please provide gender"]
  },
  email: {
    type: String,
    unique: [true, "email id should be unique"],
  },
  address: {
    type: String,
    required: [true, "Please provide address"]
  },
  city: {
    type: String,
    required: [true, "Please provide city"]
  },
  state: {
    type: String,
    required: [true, "Please provide state"]
  },
  pincode: {
    type: Number,
    required: [true, "Please provide pincode"]
  },
  uid: {
    type: Number,
    required: [true, "Please provide unique id"]
  },
  user_image: {
    type: String,
  }
}, { timestamps: true });

mongoose.models = {};

const User = mongoose.model("User", userSchema);
export default User;