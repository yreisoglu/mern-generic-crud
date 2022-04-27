const express = require("express");
const { default: mongoose, Schema } = require("mongoose");
const AccountModel = require("../models/AccountModel");
const router = express.Router();
const jwt = require("jsonwebtoken");

const config = process.env;

router.post("/get-admin-form", (req, res) => {
  try {
    const decoded = jwt.verify(req.body.token, config.TOKEN_KEY);
    if (decoded.role == "admin") {
      const id = decoded.account_id;
      AccountModel.findById(id, { allowedForms: 1 })
        .then((response) => {
          getRequestedForm(
            response.allowedForms[0].formId,
            response.allowedForms[0].allowedField,
            response.allowedForms[0].allowedValue
          )
            .then((allowedFormResponse) => {
              res.json(allowedFormResponse);
              return;
            })
            .catch((err) => {
              console.log(err);
              res.status(404).send();
            });
        })
        .catch((err) => {
          console.log(err);
          res.status(404).send();
        });
    } else {
      res.status(404).send("User is not an admin.");
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

const getRequestedForm = (formId, field, value) => {
  return new Promise((resolve, reject) => {
    try {
      if (!mongoose.models.formSchemas) {
        createSchemasModel();
      }
      mongoose.models.formSchemas
        .findById(formId)
        .then((response) => {
          if (response) {
            const formModel = getModel(response);
            formModel
              .find({ [field]: [value] })
              .then((response) => {
                resolve(response);
              })
              .catch((err) => {
                reject(err);
              });
          }
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      reject(error);
    }
  });
};

const getModel = (response) => {
  const formSchema = new mongoose.Schema(response.formDetails);
  if (!mongoose.models[response.formName]) {
    mongoose.model(response.formName, formSchema);
  }
  return mongoose.models[response.formName];
};

const createSchemasModel = () => {
  var formUploadSetup = {
    formName: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    formDetails: Object,
  };
  const formSetupSchema = new Schema(formUploadSetup);
  mongoose.model("formSchemas", formSetupSchema);
};

module.exports = router;
