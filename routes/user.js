const express = require("express");
const UserModel = require("../models/UserModel");
const router = express.Router();


router.get("/", (req, res) => {
    res.send("user router test");
})


router.get("/get-users", (req, res) => {
    UserModel.find().sort({ $natural: -1 }).limit(10)
        .then(response => res.json(response))
        .catch(error => console.log(error));
})

router.get("/get-user-by-id", (req, res) => {
    UserModel.findById(req.query.id)
        .then(response => res.json(response))
        .catch(error => console.log(error))
})

router.post("/save-user", (req, res) => {
    const user = new UserModel(req.body)
    user.save()
        .then(response => res.json(response))
        .catch(error => {
            console.log(error);
            res.status(404)
        })
})

module.exports = router