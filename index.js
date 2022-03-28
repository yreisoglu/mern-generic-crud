const express = require('express');
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser');
const database = require("./database")();

const app = express();
app.use(cors())
const port = process.env.PORT || 5000;


app.use(express.static(__dirname + "/client/build"));
app.use('/img', express.static(__dirname + '/images'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const userRouter = require("./routes/user")
app.use("/user", userRouter)
const imageRouter = require("./routes/image")
app.use("/image", imageRouter)


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});