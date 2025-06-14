const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  status: {
    type: String,
    enum: ["Applied", "Interviewing", "Hired"],
    default: "Applied",
  },

  name: {
    type: String,
    required: true,
  },

  qualification: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: String,
    required: true,
  },

  resume: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Application", applicationSchema);
