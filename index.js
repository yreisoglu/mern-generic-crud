const express = require('express');
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser');
const database = require("./database/database")();

const app = express();
app.use(cors())
const port = process.env.PORT || 5000;


app.use(express.static(__dirname + "/client/build"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use((req, res, next) => {
    res.send('Welcome to Express');
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});