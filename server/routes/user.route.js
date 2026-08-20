const express = require("express");
const router = express.Router();
const {
  updateUserDetails,
  uploadAvatar,
  userDetails,
} = require("../controllers/user.controller.js");

const auth = require("../middlewares/auth.middleware.js");
const upload = require("../middlewares/multer.js");

router.use(auth);

// User Access Routes
/*========================================After Registration Details Update================================*/
router.put("/upload-avatar", upload.single("avatar"), uploadAvatar);
router.put("/update-user", updateUserDetails);
router.get("/user-details", userDetails);

module.exports = router;
