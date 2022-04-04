const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullname: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    firstJobDay: Date,
    totalWorkTime: {
        type: String,
        default: "",
        maxlength: 64
    },
    university: {
        type: String,
        default: "",
        maxlength: 64
    },
    graduationTime: {
        type: String,
        default: ""
    },
    previousJob: {
        type: String,
        default: "",
        maxlength: 64
    },
    skills: {
        type: String,
        default: "",
        maxlength: 1024
    },
    description: {
        type: String,
        default: "",
        maxlength: 1024
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    department: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model("User", UserSchema);