const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const loginUser = asyncHandler(async (req, res) => {
    // Destructurar la informacion del Body Request
    const { email, password } = req.body;

    // Verificar que se reciba la informacion de el modelo
    if (!email || !password) {
        res.status(400);
        throw new Error("Favor de verificar que esten todos los datos");
    }

    // Verificar la existencia del usuario
    const user = await User.findOne({ email });

    // Comparamos el Hash del Password y el Usuario
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            message: "Login Exitoso",
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user.id),
        });
    } else {
        res.status(400);
        throw new Error("Compruebe sus datos e intente nuevamente");
    }
});

const registerUser = asyncHandler(async (req, res) => {
    // Destructurar el Body
    let { name, email, password, isAdmin } = req.body;
    // Verificar que contenga el campo Admin y este sea True. Caso Contrario se asigna False
    if (!isAdmin) {
        isAdmin = false;
    }
    console.log(isAdmin);
    // Verificar que el Body contenga los datos necesarios
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Verificar los datos ingresados");
    }
    // Verificar si el usuario ya existe
    const userExiste = await User.findOne({ email });
    if (userExiste) {
        res.status(400);
        throw new Error("Este correo ya se encuentra registrado");
    }
    // Realizar un Hash al Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Crear el usuario
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        isAdmin,
    });
    // Mandamos la respueta de la funcion
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error("No se ha logrado crear el usuario");
    }
});

const getUserData = asyncHandler(async (req, res) => {
    res.json(req.user);
});

const switchUser = asyncHandler(async (req, res) => {
    const user = req.user.id;
    let status = req.user.isActive;
    status ? (status = false) : (status = true);
    const newStatus = await User.findByIdAndUpdate(user, { isActive: status });
    res.status(200).json(`Se ha cambiado el estado del usuario ${req.user.name} a ${status}`);
});

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};

module.exports = {
    registerUser,
    loginUser,
    getUserData,
    switchUser,
};
