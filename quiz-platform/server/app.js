

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Quiz API is running"
    });
});

module.exports = app;





