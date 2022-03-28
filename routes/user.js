const express = require("express");
const UserModel = require("../models/UserModel");
const router = express.Router();
const Cryptr = require('cryptr');


router.get("/", (req, res) => {
    const decryptedResponse = []
    UserModel.find().sort({ $natural: -1 })
        .then(response => {
            response.forEach((item) => {
                decryptedResponse.push(decryptResponse(item, req.headers.userssecretkey))
            })
            res.json(decryptedResponse)
        })
        .catch(error => console.log(error));
})

router.get("/get-user-by-id", (req, res) => {
    const usersSecretKey = req.headers.userssecretkey;
    UserModel.findById(req.query.id)
        .then(response => {
            try {
                res.json(decryptResponse(response, usersSecretKey))
            }
            catch {
                res.json({ "error": "Bad Authenticate data" })
                res.statusCode = "401"
            }

        })
        .catch(error => console.log(error))
})

router.post("/", (req, res) => {
    const usersSecretKey = req.headers.userssecretkey;
    const user = new UserModel(encryptBody(req.body, usersSecretKey))
    user.save()
        .then((response) => {
            res.json(response);
        })
        .catch((error) => {
            console.log(error);
            res.statusCode = "404"
        })
})


router.put("/", async (req, res) => {

    let newObject = encryptBody(req.body, req.headers.userssecretkey);
    UserModel.findByIdAndUpdate(req.body._id, newObject)
        .then(response => res.json(decryptResponse(response, req.headers.userssecretkey)))
        .catch(error => console.log(error))

});

router.delete("/", (req, res) => {
    UserModel.findByIdAndDelete(req.body._id).then(response => res.json(response)).catch(error => console.log(error))
})

router.delete("/delete-multiple", (req, res) => {
    const ids = req.body["ids"];
    UserModel.deleteMany({ _id: { $in: ids } }).then(response => res.json(response)).catch(error => console.log(error))
})



const decryptResponse = (response, usersSecretKey) => {
    const cryptr = new Cryptr(usersSecretKey);
    response.description = cryptr.decrypt(response.description);
    return response
}
const encryptBody = (body, usersSecretKey) => {
    const cryptr = new Cryptr(usersSecretKey);
    body.description = cryptr.encrypt(body.description);
    return body
}

module.exports = router