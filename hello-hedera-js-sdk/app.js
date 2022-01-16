const express = require("express");
const app = express();
const testmain = require("./testmain"); 
const PORT = process.env.PORT || 8080;


 var testido = testmain();


app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));