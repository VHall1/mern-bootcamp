const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8000;

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.use(cors());
app.use(express.json());

try {
  mongoose.connect(process.env.MONGO_DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB");
} catch (error) {
  console.error(`Had an error connecting to MongoDB: ${error}`);
}

app.use("/files", express.static(path.resolve(__dirname, "..", "files")));
app.use(routes);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
