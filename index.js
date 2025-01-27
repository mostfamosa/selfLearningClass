const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000; // The port your application will run on

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Redirect the root URL ("/") to the introDNA page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/scoreboard/scoreboard.html"));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
