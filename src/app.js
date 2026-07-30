const express = require("express");
const authRoutes = require("./routes/auth.routes");
const errorHandler = require("./middleware/error.middleware");
const userRoutes = require("./routes/user.routes");
const leadRoute = require("./routes/lead.routes");

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/leads", leadRoute);
app.use(errorHandler);
module.exports = app;
