const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3003;
const { errorHandler } = require('./middleware/errormiddleware');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define your routes before the error handling middleware
app.use("/api/goals/", require("./routes/goalroutes"));

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => console.log("The server is running on port " + port));
