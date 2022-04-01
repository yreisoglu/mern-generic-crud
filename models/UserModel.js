const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        default: ""
    },
    email: {
        type: String,
        required: true,
        default: ""
    },
    image: {
        type: String,
        required: true,
        default: ""
    },
    firstJobDay: Date,
    totalWorkTime: {
        type: String,
        required: true,
        default: ""
    },
    university: {
        type: String,
        required: true,
        default: ""
    },
    graduationTime: {
        type: String,
        required: true,
        default: ""
    },
    previousJob: {
        type: String,
        required: true,
        default: ""
    },
    skills: {
        type: String,
        required: true,
        default: ""
    },
    description: {
        type: String,
        required: true,
        default: ""
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model("User", UserSchema);