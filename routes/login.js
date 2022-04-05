const bcrypt = require("bcrypt")
const Account = require("../models/AccountModel")
const express = require("express");
const jwt = require("jsonwebtoken")
const router = express.Router();
const auth = require("../middleware/auth")


router.post("/welcome", auth, (req, res) => {
    res.status(200).send("welcome")
})


router.post("/register", async (req, res) => {

    try {
        const { username, password } = req.body;

        if (!(username && password)) {
            res.status(400).send("All input is required")
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        const account = await Account.create({
            username: username,
            password: encryptedPassword
        })

        const token = jwt.sign(
            { account_id: account._id, username },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );

        account.token = token
        res.status(201).json(account)

    } catch (err) {
        console.log(err)
    }

})


router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!(username, password)) {
            res.status(400).send("All input is required")
            return
        }
        const account = await Account.findOne({ username });

        if (account && (await bcrypt.compare(password, account.password))) {
            const token = jwt.sign(
                { account_id: account._id, username },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "12h"
                }
            );
            account.token = token;

            res.status(200).json(account)
            return
        }
        res.status(400).send("Invalid Credentials");
        return
    } catch (error) {
        console.log(error)
    }


})

router.post("/is-expired", (req, res) => {
    try {
        const decodedToken = jwt.decode(req.body.token, { complete: true });
        if (decodedToken.payload.exp < Date.now() / 1000) {
            res.send(true)
            return
        }
        res.send(false)
        return
    } catch (error) {
        console.error(error)
        res.send(true)
    }

})
module.exports = router
