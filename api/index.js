// app.js
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/routes");
const swaggerDocs = require('./swagger'); // Import Swagger configuration

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://20521328:McvsnJeQrTNWMU7U@bookingres.dprdfjf.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log("Error connecting to MongoDb", err);
});

// Swagger setup
swaggerDocs(app);

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
