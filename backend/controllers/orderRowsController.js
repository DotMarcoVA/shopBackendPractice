const asyncHandler = require("express-async-handler");
const Row = require("../models/orderRowsModel");

const getRow = asyncHandler(async (req, res) => {
    const row = await Row.find({ order: req.body.order });
    res.status(200).json(row);
});

const setRow = asyncHandler(async (req, res) => {
    const { order, product, amount, total } = req.body;
    if (!order || !product || !amount || !total) {
        res.status(400);
        throw new Error("Verificar que todos los campos esten llenos");
    }

    const row = await Row.create({
        order,
        product,
        amount,
        total,
    });

    res.status(201).json(row);
});

const updateRow = asyncHandler(async (req, res) => {
    const row = await Row.findById(req.params.id);
    if (!row) {
        res.status(400);
        throw new Error("No se encontro la fila");
    }

    const modifiedRow = await Row.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(modifiedRow);
});

const deletedRow = asyncHandler(async (req, res) => {
    const row = await Row.findById(req.params.id);
    if (!row) {
        res.status(400);
        throw new Error("No se encontro la fila");
    }

    deletedRow = await Row.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensaje: `Se ha eliminado la fila ${req.params.id}`, deletedRow });
});

module.exports = {
    getRow,
    setRow,
    updateRow,
    deletedRow,
};
