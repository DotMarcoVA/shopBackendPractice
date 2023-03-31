const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");

const getOrder = asyncHandler(async (req, res) => {
    const order = await Order.find({ user: req.user.id });
    res.status(200).json(order);
});

const setOrder = asyncHandler(async (req, res) => {
    const { paid, guide, company, delivered } = req.body;
    if (!paid || !guide || !company || !delivered) {
        res.status(400);
        throw new Error("Verificar que todos los campos esten llenos");
    }
    const order = await Order.create({
        paid,
        guide,
        company,
        delivered,
        user: req.user.id,
    });

    res.status(201).json(order);
});

const updateOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        res.status(400);
        throw new Error("No se ha encontrado la orden");
    }

    const modifiedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(modifiedOrder);
});

const deleteOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        res.status(400);
        throw new Error("No se ha encontrado la orden");
    }

    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensaje: `Se ha eliminado la orden ${req.params.id}`, deletedOrder });
});

module.exports = {
    getOrder,
    setOrder,
    updateOrder,
    deleteOrder,
};
