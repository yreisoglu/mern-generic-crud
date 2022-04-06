const express = require("express");
const { default: mongoose, Schema } = require("mongoose");
const router = express.Router();



router.post("/create-form", (req, res) => {
    try {
        userDefinedFormPattern = req.body[0]

        if (!mongoose.models.formSchemas) {
            createModel();
        }
        const formSetupModel = mongoose.models.formSchemas

        const formSetupData = {
            formName: req.body[1].formName,
            description: req.body[1].description,
            formDetails: userDefinedFormPattern
        };
        const formSetup = new formSetupModel(formSetupData);
        formSetup.save().then(response => res.json(response)).catch(error => {
            console.error(error)
            res.status(404).send();
        })
    } catch (error) {
        console.log(error)
        res.status(404).send();
    }


})

router.post("/", (req, res) => {
    try {
        if (!mongoose.models.formSchemas) {
            createModel();
        }
        mongoose.models.formSchemas.findOne({ formName: req.body.formName }).then(response => {

            const formSchema = new mongoose.Schema(response.formDetails);
            if (!mongoose.models[response.formName]) {
                mongoose.model(response.formName, formSchema);
            }
            const formModel = mongoose.models[response.formName];
            const modelTest = new formModel(req.body)
            modelTest.save().then((response) => res.json(response)).catch(err => console.log(err))
        }).catch(err => {
            console.log(err);
            res.status(404).send();
        })
    } catch (error) {
        console.log(error)
        res.status(404).send();
    }

})



const createModel = () => {
    var formUploadSetup = {
        formName: String,
        description: String,
        formDetails: Object
    };
    const formSetupSchema = new Schema(formUploadSetup);
    mongoose.model('formSchemas', formSetupSchema);
}


module.exports = router