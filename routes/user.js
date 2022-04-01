const express = require("express");
const UserModel = require("../models/UserModel");
const router = express.Router();
const Cryptr = require('cryptr');
const multer = require("multer");
const auth = require("../middleware/auth")

const usersSecretKey = process.env.USERS_SECRET_KEY


const firebaseAdmin = require('firebase-admin');

const serviceAccount = {
    "type": process.env.type,
    "project_id": process.env.project_id,
    "private_key_id": process.env.private_key_id,
    "private_key": process.env.private_key.replace(/\\n/g, '\n'),
    "client_email": process.env.client_email,
    "client_id": process.env.client_id,
    "auth_uri": process.env.auth_uri,
    "token_uri": process.env.token_uri,
    "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url,
    "client_x509_cert_url": process.env.client_x509_cert_url
};


const admin = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount)
})
const storageRef = admin.storage().bucket(`gs://mern-generic-crud.appspot.com`);



const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './images');
    },
    filename: function (req, file, callback) {
        let fileType;
        if (file.mimetype === 'image/png') {
            fileType = '.png'
        } else if (file.mimetype === 'image/jpeg') {
            fileType = '.jpg'
        }
        callback(null, Date.now() + fileType);
    }
});

const upload = multer({ storage: storage });


router.get("/", auth, (req, res) => {
    try {
        const decryptedResponse = []
        UserModel.find().sort({ $natural: -1 })
            .then(response => {
                response.forEach((item) => {
                    decryptedResponse.push(decryptResponse(item))
                })
                res.json(decryptedResponse)
            })
            .catch(error => console.log(error));
    } catch (error) {
        console.log(error)
    }

})

router.get("/get-user-by-id", auth, (req, res) => {
    try {
        UserModel.findById(req.query.id)
            .then(response => {
                try {
                    res.json(decryptResponse(response))
                }
                catch {
                    res.json({ "error": "Bad Authenticate data" })
                    res.statusCode = "401"
                }

            })
            .catch(error => console.log(error))
    } catch (error) {
        console.log(error)
    }
})

router.post("/", upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            console.log("No file received");
            return res.send({
                success: false
            });

        } else {
            const user = new UserModel(encryptBody(req.body))
            await storageRef.upload(req.file.path, { public: true }).then(snapshot => {
                console.log(snapshot[0].metadata.mediaLink);
                user.image = snapshot[0].metadata.mediaLink
            })
            user.save()
                .then((response) => {
                    res.json(response);
                })
                .catch((error) => {
                    console.log(error);
                    res.statusCode = "404"
                })
        }
    } catch (error) {
        console.log(error)
    }

})


router.put("/", auth, upload.single("file"), async (req, res) => {
    try {
        let newObject = encryptBody(req.body);
        await storageRef.upload(req.file.path, { public: true }).then(snapshot => {
            console.log(snapshot[0].metadata.mediaLink);
            newObject.image = snapshot[0].metadata.mediaLink
        })
        UserModel.findByIdAndUpdate(req.body._id, newObject)
            .then(response => res.json(decryptResponse(response)))
            .catch(error => console.log(error))
    } catch (error) {
        console.log(error)
    }
});

router.delete("/", auth, (req, res) => {
    try {
        UserModel.findByIdAndDelete(req.body._id).then(response => res.json(response)).catch(error => console.log(error))

    } catch (error) {
        console.log(error)
    }
})

router.delete("/delete-multiple", auth, (req, res) => {
    try {
        const ids = req.body["ids"];
        UserModel.deleteMany({ _id: { $in: ids } }).then(response => res.json(response)).catch(error => console.log(error))
    } catch (error) {
        console.log(error)
    }

})



const decryptResponse = (response) => {
    try {
        const cryptr = new Cryptr(usersSecretKey);
        const decrpytedData = cryptr.decrypt(response.description);
        response.description = decrpytedData;
        return response
    } catch (error) {
        console.log(error)
    }


}
const encryptBody = (body) => {
    try {
        const cryptr = new Cryptr(usersSecretKey);
        const encryptedData = cryptr.encrypt(body.description)
        body.description = encryptedData;
        return body
    } catch (error) {
        console.log(error)
    }


}

module.exports = router