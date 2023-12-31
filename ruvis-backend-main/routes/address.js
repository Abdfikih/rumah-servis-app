const router = require("express").Router();
const addressController = require("../controllers/addressController");
const {verifyTokenAndAuthorization, verifyAdmin}= require("../middlewares/verifyToken")

router.post("/",verifyTokenAndAuthorization, addressController.createAddress);

router.delete("/:id",verifyTokenAndAuthorization, addressController.deleteAddress);

router.get("/default",verifyTokenAndAuthorization, addressController.getDefaultAddress);

router.get("/:id",verifyTokenAndAuthorization, addressController.getUserAddresses);

router.put("/:id",verifyTokenAndAuthorization, addressController.getUserAddresses);

router.post("/default/:id",verifyTokenAndAuthorization, addressController.setDefaultAddress);



module.exports = router