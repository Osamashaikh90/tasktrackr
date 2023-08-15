const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const router = require("./api/route");
app.use(cors());
app.use(express.json());
app.use("/todo", router);

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT} I am connected .`);
});
