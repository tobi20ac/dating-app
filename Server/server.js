const express = require("express");
const app = express();

app.listen(3000);

app.get("/", (re, res) => {
    res.render("./View/mainFeed.html")
})

