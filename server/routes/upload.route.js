const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware.js");
const uploadImageController = require("../controllers/uploadImage.controller.js");
const upload = require("../middlewares/multer.js");

router.post("/upload", auth, upload.single("image"), uploadImageController);

export default uploadRouter;
