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
   timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", userSchema);


