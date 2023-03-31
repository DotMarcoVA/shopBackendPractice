const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    alias: {
        type: String,
        required: [true, "Introduce un Alias"],
    },
    zipcode: {
        type: Number,
        required: [true, "Introduce el Codigo Postal"],
    },
    country: {
        type: String,
        required: [true, "Introduce el Pais"],
    },
    state: {
        type: String,
        required: [true, "Introduce el Estado"],
    },
    city: {
        type: String,
        required: [true, "Introduce la Ciudad"],
    },
    settlement: {
        type: String,
        required: [true, "Introduce la Colonia"],
    },
    street: {
        type: String,
        required: [true, "Introduce la Calle"],
    },
    number: {
        type: Number,
        required: [true, "Introduce el Numero Exterior"],
    },
    references: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model("Address", addressSchema);
