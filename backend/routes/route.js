const { editNewImage,delimage,readImage,edit,index,upload,about,deleteData, update,cooky,create,creatdata,isLoggedin, showAlldata,login,logout,signin, showdata,cookishow,cookidel,editImage } = require('../control/homecontroller');
const multer  = require('multer');

const express = require('express');
const router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const file_name = `${Date.now()}-${file.originalname}`;
      cb(null, file_name);
    }
  })
const uploads = multer({ storage: storage })
router.post("/upload",uploads.single('image'),upload);

// new Uploded 
const store = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
      const file_name = `${Date.now()}-${file.originalname}`;
    cb(null, file_name);
  }
})
const uploadnewImag = multer({storage:store})
router.post("/editNewImage/:id",uploadnewImag.single('image'),editNewImage);


router.get('/editimage/:id',editImage);

router.get("/imageread",readImage);

router.get('/delimage/:id',delimage);
  
router.get("/edit/:id",edit);

router.post("/update/:id",update)

router.post("/create",creatdata);

// router.route("/create").post(creatdata);
// router.route('/create').get(create);

router.get("/create",showdata);

router.get("/showalldata",showAlldata);

router.get("/delete/:id",deleteData);

// router.route('/create').get(showdata);

router.get("/",isLoggedin,index);

router.get("/signin",signin);

// router.route('/signin').get(signin);

router.post("/login",login);


// router.route('/login').post(login);

// router.route("/cooky").get(cooky);

// router.route("/cookishow").get(cookishow);

// router.route("/cookidel").get(cookidel);

router.get("/logout",logout);

// router.route('/about').get(about);


module.exports = router;
