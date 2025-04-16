const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware.js");
const uploadImageController = require("../controllers/uploadImage.controller.js");
const upload = require("../middlewares/multer.js");

router.post("/upload", auth, upload.single("image"), uploadImageController);
// router.post("/upload", auth, upload.array("images", 10), uploadImageController);
// router.post(
//   "/upload",
//   auth,
//   upload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "images", maxCount: 5 },
//   ]),
//   uploadImageController
// );

module.exports = router;
