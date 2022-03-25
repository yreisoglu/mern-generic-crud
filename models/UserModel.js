const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    surname: String,
    email: String,
    image: String,
    firstJobDay: Date,
    totalWorkTime: String,
    university: String,
    graduationTime: Date,
    previousJob: String,
    skills: String,
    description: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model("User", UserSchema);