const mongoose = require("mongoose");

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const databaseName = process.env.DB_NAME;
module.exports = () => {
  mongoose.connect(
    `mongodb+srv://${username}:${password}@mern-generic-crud.m9kah.mongodb.net/${databaseName}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
    }
  );
  mongoose.connection.on("open", () => {
    console.log("MongoDB connected.");
  });
  mongoose.connection.on("error", (err) => {
    console.log("MongoDB error: " + err);
  });
  mongoose.Promise = global.Promise;
};
