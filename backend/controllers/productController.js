const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
});

const setProducts = asyncHandler(async (req, res) => {
    // Verificar que sea admin
    const adminFlag = req.user.isAdmin;
    if (adminFlag != true) {
        res.status(401);
        throw new Error("Acceso no Autorizado para Clientes");
    }

    const { nombre, marca, categoria, sku, precio } = req.body;
    if (!nombre || !marca || !categoria || !sku || !precio) {
        res.status(400);
        throw new Error("Verificar que todos los campos esten llenos");
    }

    const product = await Product.create({
        nombre,
        marca,
        categoria,
        sku,
        precio,
    });

    res.status(201).json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
    const adminFlag = req.user.isAdmin;
    if (adminFlag != true) {
        res.status(401);
        throw new Error("Acceso no Autorizado para Clientes");
    }
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(400);
        throw new Error("No se ha encontrado el Producto especificado");
    }

    const modifiedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json(modifiedProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
    const adminFlag = req.user.isAdmin;
    if (adminFlag != true) {
        res.status(401);
        throw new Error("Acceso no Autorizado para Clientes");
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(400);
        throw new Error("No se ha encontrado el Producto especificado");
    }

    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensaje: `Se ha eliminado el producto con id ${req.params.id}`, deletedProduct });
});

module.exports = {
    getProducts,
    setProducts,
    updateProduct,
    deleteProduct,
};
