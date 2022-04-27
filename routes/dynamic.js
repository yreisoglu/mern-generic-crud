const express = require("express");
const { default: mongoose, Schema } = require("mongoose");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./images/formIcons");
  },
  filename: function (req, file, callback) {
    let fileType;
    if (file.mimetype === "image/png") {
      fileType = ".png";
    } else if (file.mimetype === "image/jpeg") {
      fileType = ".jpg";
    }
    callback(null, Date.now() + fileType);
  },
});

const upload = multer({ storage: storage });

// Creates a form by requested fields
router.post("/create-form", upload.single("file"), (req, res) => {
  try {
    const formStructure = JSON.parse(req.body.formStructure);

    userDefinedFormPattern = formStructure[0];

    if (!mongoose.models.formSchemas) {
      createSchemasModel();
    }
    const formSetupModel = mongoose.models.formSchemas;

    const formSetupData = {
      formName: formStructure[1].formName,
      description: formStructure[1].description,
      formDetails: userDefinedFormPattern,
      icon: `/img/formIcons/${req.file.filename}`,
      primaryColor: formStructure[1].primaryColor,
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

router.put("/update-form", upload.single("file"), (req, res) => {
  try {
    const formStructure = JSON.parse(req.body.formStructure);
    if (!mongoose.models.formSchemas) {
      createSchemasModel();
    }
    const formSetupModel = mongoose.models.formSchemas;

    const formSetupData = {
      formName: formStructure[1].formName,
      description: formStructure[1].description,
      formDetails: formStructure[0],
      icon: `/img/formIcons/${req.file.filename}`,
      primaryColor: formStructure[1].primaryColor,
    };
    formSetupModel
      .findByIdAndUpdate({ _id: formStructure[2].form_id }, formSetupData)
      .then((response) => {
        if (fs.existsSync("./images/formIcons" + response.icon.replace("/img/formIcons", ""))) {
          fs.unlink("./images/formIcons" + response.icon.replace("/img/formIcons", ""), (err) => {
            if (err) console.log(err);
          });
        }
        res.json(response);
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
    icon: { type: String, required: true },
    primaryColor: { type: String, required: true },
  };
  const formSetupSchema = new Schema(formUploadSetup);
  mongoose.model("formSchemas", formSetupSchema);
};

module.exports = router;
