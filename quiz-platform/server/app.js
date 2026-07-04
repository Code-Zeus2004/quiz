const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Quiz API is running"
    });
});

module.exports = app;

const pool = require("./config/db");

app.get("/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        
        return res.json({
            connected: true,
            time: result.rows[0].now
        });

    } catch (err) {
        console.error("DB ERROR:", err); // IMPORTANT for debugging

        return res.status(500).json({
            connected: false,
            error: err.message || "Unknown error"
        });
    }
});