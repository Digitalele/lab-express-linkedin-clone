const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({

    username: {type: String},
    name: {type: String},
    email: {type: String},
    password: {type: String},
    summary: {type: String},
    imageUrl: {type: String},
    company: {type: String},
    jobTitle: {type: String}
}, {
  timestamps: {
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
  }
});

const User = mongoose.model("User", userSchema);


