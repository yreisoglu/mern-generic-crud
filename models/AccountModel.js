const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    username: { type: String, unique: true },
    password: { type: String },
    token: { type: String }
});

module.exports = mongoose.model("Account", AccountSchema);