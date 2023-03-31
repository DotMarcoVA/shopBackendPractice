const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000;
const colors = require("colors");
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use("/api/productos", require("./routes/productRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});