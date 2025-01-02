const express = require("express")
const routes = express.Router();
const multer = require("multer");

const {create,readimage ,readMultipleImage,delImage} =  require("../control/multiplecontrol");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images/')
    },
    filename: function (req, file, cb) {
        const file_name = `${Date.now()}-${file.originalname}`;
      cb(null, file_name);
    }
  })
  
const upload = multer({ storage: storage })

routes.post("/create",upload.fields([{ name: 'image', maxCount: 1 },{ name: 'images', maxCount: 5 } ]),create
);

routes.get("/readImage",readimage);
routes.get("/readmulimages",readMultipleImage)
routes.get("/delimage/:id",delImage);

module.exports = routes;