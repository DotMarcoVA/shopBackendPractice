const mongoose = require("mongoose");

const rowSchema = mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    amount: {
        type: Number,
        required: [true, "Introduce la cantidad"],
    },
    total: {
        type: Number,
        required: [true, "Introduce el total"],
    },
});

module.exports = mongoose.model("Row", rowSchema);
