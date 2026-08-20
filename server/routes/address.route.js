const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware.js");
const {
  addAddressController,
  deleteAddresscontroller,
  getAddressController,
  updateAddressController,
} = require("../controllers/address.controller.js");

router.use(auth);

// User Access Routes
router.post("/create", addAddressController);
router.get("/get", getAddressController);
router.put("/update", updateAddressController);
router.delete("/disable", deleteAddresscontroller);

module.exports = router;
