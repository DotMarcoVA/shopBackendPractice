const express = require("express");
const router = express.Router();
const { getOrder, setOrder, updateOrder, deleteOrder } = require("../controllers/orderController");
const { getRow, setRow, updateRow, deletedRow } = require("../controllers/orderRowsController");
const { getPay, setPay, updatePay, deletePay } = require("../controllers/orderPaymentsController");
const { protect } = require("../middleware/authMiddleware");

// Orders
router.get("/view", protect, getOrder);
router.post("/view", protect, setOrder);
router.put("/view/:id", protect, updateOrder);
router.delete("/view/:id", protect, deleteOrder);
// Rows
router.get("/row", protect, getRow);
router.post("/row", protect, setRow);
router.put("/row/:id", protect, updateRow);
router.delete("/row/:id", protect, deletedRow);
// Payments
router.get("/payment", protect, getPay);
router.post("/payment", protect, setPay);
router.put("/payment/:id", protect, updatePay);
router.delete("/payment/:id", protect, deletePay);
module.exports = router;
