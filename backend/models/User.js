const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type:String,
    required:true
  },
  role: {
    type: String,
    enum: ["Job Seeker", "Employer"],
    required: true,
    default: 'USER',
  },
});

module.exports = mongoose.model("User", userSchema);
