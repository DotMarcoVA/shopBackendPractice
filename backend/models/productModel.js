const { default: mongoose } = require("mongoose");
const moongose = require("mongoose");

const productSchema = moongose.Schema(
    {
        nombre: {
            type: String,
            required: [true, "Introduce el Nombre"],
        },
        marca: {
            type: String,
            required: [true, "Introduce la Marca"],
        },
        categoria: {
            type: String,
            required: [true, "Selecciona una Categoria"],
        },
        sku: {
            type: String,
            required: [true, "Introduce el codigo SKU"],
            unique: true,
        },
        precio: {
            type: Number,
            required: [true, "Introduce el Precio"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Product", productSchema);
