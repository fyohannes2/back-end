//ENTRY POINT OF SERVER
//when server is spinned, this file is executed. 
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");


const morgan = require("morgan");

//server running with express to access functionalities. All of the value is stored in the variable app.
const app = express();
const http = require("http").createServer(app);


// db connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));

// middlewares
// data will be received as JSON data, maximum of 4 megabytes.
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));
// apply cors so there is no conflict between different client running in another domain.
app.use(cors());
app.use(morgan("dev"));

// route middlewares
//prefix with /api/ 
app.use("/api", authRoutes);

const port = process.env.PORT || 8000;

http.listen(port, () => console.log("Server running on port 8000"));