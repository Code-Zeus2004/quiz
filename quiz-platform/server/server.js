 console.log("server.js is running...");
require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


/** Debug route for testing authentication functionality
 * 
 * 
 * app.get("/debug-route", (req, res) => {
    res.json({ ok: true, message: "auth system connected" });
});
 * 
 * 
 */