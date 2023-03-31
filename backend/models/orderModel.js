const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        paid: {
            type: Boolean,
            required: [true, "Selecciona un estado de pago"],
        },
        guide: {
            type: String,
            required: [true, "Introduce la Guia de Envio"],
        },
        company: {
            type: String,
            required: [true, "Introduce la Empresa de Paqueteria"],
        },
        delivered: {
            type: Boolean,
            required: [true, "Selecciona un estado de recepcion"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Order", orderSchema);
