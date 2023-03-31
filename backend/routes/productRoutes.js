const express = require("express");
const router = express.Router();
const { getProducts, setProducts, updateProduct, deleteProduct } = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", getProducts);
router.post("/", protect, setProducts);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;
