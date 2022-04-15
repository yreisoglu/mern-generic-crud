const express = require("express");
const { default: mongoose, Schema } = require("mongoose");
const router = express.Router();
// Creates a form by requested fields
router.post("/create-form", (req, res) => {
  try {
    userDefinedFormPattern = req.body[0];

    if (!mongoose.models.formSchemas) {
      createSchemasModel();
    }
    const formSetupModel = mongoose.models.formSchemas;

    const formSetupData = {
      formName: req.body[1].formName,
      description: req.body[1].description,
      formDetails: userDefinedFormPattern,
    };
    const formSetup = new formSetupModel(formSetupData);
    formSetup
      .save()
      .then((response) => res.json(response))
      .catch((error) => {
        console.error(error);
        res.status(422).send(error);
      });
  } catch (error) {
    console.log(error);
    res.status(404).send();
  }
});

// Returns list of forms
router.get("/get-forms", (req, res) => {
  try {
    if (!mongoose.models.formSchemas) {
      createSchemasModel();
    }
    mongoose.models.formSchemas
      .find()
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        console.log;
        res.status(404).send();
      });
  } catch (error) {}
});

router.put("/update-form", (req, res) => {
  try {
    if (!mongoose.models.formSchemas) {
      createSchemasModel();
    }
    const formSetupModel = mongoose.models.formSchemas;

    const formSetupData = {
      formName: req.body[1].formName,
      description: req.body[1].description,
      formDetails: req.body[0],
    };

    formSetupModel
      .findByIdAndUpdate({ _id: req.body[2].form_id }, formSetupData)
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send();
      });
  } catch (error) {
    res.status(404).send();
  }
});

router.delete("/delete-forms", (req, res) => {
  try {
    if (!mongoose.models.formSchemas) {
      createSchemasModel();
    }
    const form_ids = req.body["form_ids"];

    mongoose.models.formSchemas
      .find({ _id: { $in: form_ids } }, { formName: 1 })
      .then((response) => {
        if (response) {
          response.forEach((item) => {
            mongoose.connection.dropCollection(item.formName, (err, result) => {});
          });
          mongoose.models.formSchemas
            .deleteMany({
              _id: { $in: form_ids },
            })
            .then((response) => {
              res.json(response);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {}
});

// Posts a document to form collection
router.post("/", (req, res) => {
  try {
    if (!mongoose.models.formSchemas) {
      createSchemasModel();
    }
    mongoose.models.formSchemas
      .findOne({ _id: req.body.form_id })
      .then((response) => {
        if (response) {
          const formModel = getModel(response);
          const data = new formModel(req.body);
          data
            .save()
            .then((response) => res.json(response))
            .catch((err) => {
              console.log(err);
              res.status(400).send(err.errors.title.message);
            });
          return;
        }
        res.status(404).send("Form is unavailable");
        return;
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send();
      });
  } catch (error) {
    console.log(error);
    res.status(404).send();
  }
});
// Returns the requested form documents
router.get("/", (req, res) => {
  try {
    if (!mongoose.models.formSchemas) {
      createSchemasModel();
    }
    mongoose.models.formSchemas
      .findById(req.body.form_id)
      .then((response) => {
        if (response) {
          const formModel = getModel(response);
          formModel
            .find()
            .then((response) => res.json(response))
            .catch((err) => {
              console.log(err);
              res.status(400).json(err.errors.title.message);
            });

          return;
        }
        res.status(404).send("Form is unavailable");
        return;
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send();
      });
  } catch (error) {
    console.log(error);
    res.status(404).send();
  }
});

// Update a document from a Form
router.put("/", (req, res) => {
  try {
    if (!mongoose.models.formSchemas) {
      createSchemasModel();
    }
    mongoose.models.formSchemas
      .findOne({ _id: req.body.form_id })
      .then((response) => {
        if (response) {
          const formModel = getModel(response);
          formModel
            .findByIdAndUpdate(req.body.document_id, req.body)
            .then((response) => res.json(response))
            .catch((err) => console.log(err));
          return;
        }
        res.status(404).send("Form is unavailable");
        return;
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send();
      });
  } catch (error) {
    console.log(error);
    res.status(404).send();
  }
});

// Delete a Document from a form
router.delete("/", (req, res) => {
  try {
    const ids = req.body["document_ids"];
    if (!mongoose.models.formSchemas) {
      createSchemasModel();
    }
    mongoose.models.formSchemas
      .findOne({ _id: req.body.form_id })
      .then((response) => {
        if (response) {
          const formModel = getModel(response);
          formModel
            .deleteMany({ _id: { $in: ids } })
            .then((response) => res.json(response))
            .catch((err) => console.log(err));
          return;
        }
        res.status(404).send("Form is unavailable");
        return;
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send();
      });
  } catch (error) {
    console.log(error);
    res.status(404).send();
  }
});

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
