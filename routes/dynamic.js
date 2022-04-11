const express = require("express");
const { default: mongoose, Schema } = require("mongoose");
const router = express.Router();



router.post("/create-form", (req, res) => {
    try {
        userDefinedFormPattern = req.body[0]

        if (!mongoose.models.formSchemas) {
            createSchemasModel();
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

router.get("/", (req, res) => {
    try {
        if (!mongoose.models.formSchemas) {
            createSchemasModel();
        }
        mongoose.models.formSchemas.findOne({ formName: req.body.formName }).then(response => {
            if (response) {
                const formModel = getModel(response)
                formModel.find().then(response => res.json(response)).catch(err => { console.log(err); res.status(400).json(err.errors.title.message) })

                return
            }
            res.status(404).send("Form is unavailable");
            return
        }).catch(err => {
            console.log(err);
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
            createSchemasModel();
        }
        mongoose.models.formSchemas.findOne({ formName: req.body.formName }).then(response => {
            if (response) {
                const formModel = getModel(response)
                const data = new formModel(req.body)
                data.save().then((response) => res.json(response)).catch(err => { console.log(err); res.status(400).send(err.errors.title.message) })
                return
            }
            res.status(404).send("Form is unavailable");
            return
        }).catch(err => {
            console.log(err);
            res.status(404).send();
        })
    } catch (error) {
        console.log(error)
        res.status(404).send();
    }

})

router.put("/", (req, res) => {
    try {
        if (!mongoose.models.formSchemas) {
            createSchemasModel();
        }
        mongoose.models.formSchemas.findOne({ formName: req.body.formName }).then(response => {
            if (response) {
                const formModel = getModel(response)
                formModel.findByIdAndUpdate(req.body._id, req.body).then(response => res.json(response)).catch(err => console.log(err))
                return
            }
            res.status(404).send("Form is unavailable");
            return
        }).catch(err => {
            console.log(err);
            res.status(404).send();
        })
    } catch (error) {
        console.log(error)
        res.status(404).send();
    }
})


router.delete("/", (req, res) => {
    try {
        const ids = req.body["ids"];
        if (!mongoose.models.formSchemas) {
            createSchemasModel();
        }
        mongoose.models.formSchemas.findOne({ formName: req.body.formName }).then(response => {
            if (response) {
                const formModel = getModel(response)
                formModel.deleteMany({ _id: { $in: ids } }).then(response => res.json(response)).catch(err => console.log(err))
                return
            }
            res.status(404).send("Form is unavailable");
            return
        }).catch(err => {
            console.log(err);
            res.status(404).send();
        })
    } catch (error) {
        console.log(error)
        res.status(404).send();
    }
})

const getModel = (response) => {
    const formSchema = new mongoose.Schema(response.formDetails);
    if (!mongoose.models[response.formName]) {
        mongoose.model(response.formName, formSchema);
    }
    return mongoose.models[response.formName];
}

const createSchemasModel = () => {
    var formUploadSetup = {
        formName: String,
        description: String,
        formDetails: Object
    };
    const formSetupSchema = new Schema(formUploadSetup);
    mongoose.model('formSchemas', formSetupSchema);
}


module.exports = router