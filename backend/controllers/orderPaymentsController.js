const asyncHandler = require("express-async-handler");
const Pay = require("../models/orderPaymentModel");

const getPay = asyncHandler(async (req, res) => {
    const pay = await Pay.find({ order: req.body.order });
    res.status(200).json(pay);
});

const setPay = asyncHandler(async (req, res) => {
    const { order, payDate, confirmation, amount, payMethod } = req.body;
    if (!order || !payDate || !confirmation || !amount || !payMethod) {
        res.status(400);
        throw new Error("Verificar que todos los campos esten llenos");
    }
    const pay = await Pay.create({
        order,
        payDate,
        confirmation,
        amount,
        payMethod,
    });
    res.status(201).json(pay);
});

const updatePay = asyncHandler(async (req, res) => {
    const pay = await Pay.findById(req.params.id);
    if (!pay) {
        res.status(400);
        throw new Error("No se ha encontrado el pago");
    }
    const modifiedPay = await Pay.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(modifiedPay);
});

const deletePay = asyncHandler(async (req, res) => {
    const pay = await Pay.findById(req.params.id);
    if (!pay) {
        res.status(400);
        throw new Error("No se ha encontrado el pago");
    }

    const deletedPay = await Pay.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensaje: `Se ha eliminado el pago ${req.params.id}`, deletedPay });
});

module.exports = {
    getPay,
    setPay,
    updatePay,
    deletePay,
};
