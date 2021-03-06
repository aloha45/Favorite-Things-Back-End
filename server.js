const express = require("express");
const app = express();
const path = require("path");
const logger = require("morgan");
const cors = require('cors');

require("dotenv").config();
require("./config/database");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const listRouter = require('./routes/lists')

app.use(cors());
app.use(logger("dev"));
app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));

app.use("/api/auth", authRouter);
app.use(require('./config/auth'))
app.use("/api/users", userRouter);
app.use('/api/lists', listRouter);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Express is listening on port ${port}.`);
});
