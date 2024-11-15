const express = require("express");
const app = express();
app.use(express.static('public'));
const routere = express.Router();
const controllers = require("../controllers/controller");
const multer = require('multer')
const upload = multer({ dest: 'public/Images' })
routere.route("/mailotp").post(controllers.mailotp);
routere.route("/getcontact").post(controllers.getcontact);
routere.post("/addpost", upload.single('Photo'), controllers.addpost);
routere.post("/updatephoto/:id", upload.single('data'), controllers.updatephoto);
routere.route("/notice").post(controllers.notice);
routere.route("/getdata").post(controllers.getdata);
routere.route("/getvalue").post(controllers.getvalue);
routere.route("/page/:id").post(controllers.page);
routere.route("/userDetail").post(controllers.userDetail);
routere.route("/getHome").get(controllers.getHome);
routere.route("/updateuser/:id").post(controllers.updateuser);
routere.route("/deletepost/:id").delete(controllers.deletepost);
routere.route("/deleteuser/:id").delete(controllers.deleteuser);
module.exports = routere;   