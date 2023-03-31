const asyncHandler = require("express-async-handler");
const Address = require("../models/addressModel");

const getAddress = asyncHandler(async (req, res) => {
    const address = await Address.find({ user: req.user.id });
    res.status(200).json(address);
});

const setAddress = asyncHandler(async (req, res) => {
    let { alias, zipcode, country, state, city, settlement, street, number, references } = req.body;
    if (!references) {
        references = "No References Added";
    }
    if (!alias || !zipcode || !country || !state || !city || !settlement || !street || !number || !references) {
        res.status(400);
        throw new Error("Verificar que todos los campos esten llenos");
    }

    const add = await Address.create({
        alias,
        zipcode,
        country,
        state,
        city,
        settlement,
        street,
        number,
        references,
        user: req.user.id,
    });

    res.status(201).json(add);
});

const updateAddress = asyncHandler(async (req, res) => {
    const address = await Address.findById(req.params.id);
    if (!address) {
        res.status(400);
        throw new Error("No se ha encontrado la direccion especificada");
    }
    const modifiedAddress = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(modifiedAddress);
});

const deleteAddress = asyncHandler(async (req, res) => {
    const address = await Address.findById(req.params.id);
    if (!address) {
        res.status(400);
        throw new Error("No se ha encontrado la direccion especificada");
    }

    const deletedAddress = await productModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
        mensaje: `Se ha eliminado la direccion con id ${req.params.id}`,
        deletedAddress,
    });
});

module.exports = {
    getAddress,
    setAddress,
    updateAddress,
    deleteAddress,
};
