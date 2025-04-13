const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware.js");
const {
  addAddressController,
  deleteAddresscontroller,
  getAddressController,
  updateAddressController,
} = require("../controllers/address.controller.js");

router.post("/create", auth, addAddressController);
router.get("/get", auth, getAddressController);
router.put("/update", auth, updateAddressController);
router.delete("/disable", auth, deleteAddresscontroller);

module.exports = router;
