const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUserData, switchUser } = require("../controllers/userController");
const { getAddress, setAddress, updateAddress, deleteAddress } = require("../controllers/adressController");
const { protect } = require("../middleware/authMiddleware");

// User
router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserData);
router.get("/switch", protect, switchUser);
// Adress
router.get("/address", protect, getAddress);
router.post("/address", protect, setAddress);
router.put("/address/:id", protect, updateAddress);
router.delete("/address/:id", protect, deleteAddress);

module.exports = router;
