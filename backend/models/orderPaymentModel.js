const mongoose = require("mongoose");

const paySchema = mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },
    payDate: {
        type: String,
        required: [true, "Inserte la fecha del pago"],
    },
    confirmation: {
        type: Boolean,
        required: [true, "Inserta el estado del pago"],
    },
    amount: {
        type: Number,
        required: [true, "Ingresa la cantidad"],
    },
    payMethod: {
        type: String,
        required: [true, "Ingrese una forma de pago"],
    },
});

module.exports = mongoose.model("Pay", paySchema);
