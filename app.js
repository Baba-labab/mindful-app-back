require("dotenv").config();

require("./db");

const express = require("express");

const app = express();

//make public fildes inside 'public/' folder publicly accessible
app.use(express.static('assets'))

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const exerciseRoutes = require("./routes/exercise.routes"); 
app.use("/exercises", exerciseRoutes); 

const reflectionRoutes = require("./routes/reflection.routes");
app.use("/reflections", reflectionRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/users", userRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
