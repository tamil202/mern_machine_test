// importS
const express = require("express");
require("dotenv").config();  // envi files handle
const cors = require("cors");  // access site
const mongoose = require("mongoose");  // db package

const PORT = 8000 || process.env.PORT;

// swapping funtions
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: { origin: "*" } })); 
app.use(express.static('public'))

// routes
app.use(require("./src/router/route"));

// db connect
let uri = "mongodb+srv://fury:mnm@cluster0.6lai5xn.mongodb.net/userdetails";
// listen
app.listen(PORT, () => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(
        ".................................................database connected......................................."
      );
    })
    .catch((e) => console.error(e));
  console.log(`server start from localhost:${PORT}`);
});
