if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

const dotenv = require("dotenv");

dotenv.config();

// Cookie-Parser

var cookieParser = require("cookie-parser");

app.use(cookieParser());

//MongoDb Configuration
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//MongoDb Connection
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to MongoDB"));

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// EJS
app.set("view engine", "ejs");

app.use(function (req, res, next) {
  res.setHeader("charset", "utf-8");
  next();
});

// Routes
app.use("/", require("./controllers/HomePage"));
app.use("/", require("./controllers/Register"));
app.use("/", require("./controllers/Login"));
app.use("/", require("./controllers/About"));

app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
