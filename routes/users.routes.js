const express = require("express");
const multer = require("multer");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const verifyToken = require("../middleware/verifyToken");
const appError = require("../utils/appError");
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const filename = `user-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});
const fileFilter = (req, file, cb) => {
  const imageType = file.mimetype.split("/")[0];
  if (imageType === "image") {
    cb(null, true);
  } else {
    cb(appError.create("Only image files are allowed", 400, "FAIL"), false);
  }
};
const upload = multer({ storage: diskStorage, fileFilter: fileFilter });
router.route("/").get(verifyToken, usersController.getAllUsers);
router
  .route("/register")
  .post(upload.single("avatar"), usersController.register);
router.route("/login").post(usersController.login);

module.exports = router;
