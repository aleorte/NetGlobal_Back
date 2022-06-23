const express = require("express");
const app = express();
const morgan = require("morgan");
const db = require("./db/index");
const cors = require("cors");
const helmet = require("helmet")
const models = require("./models/index");


app.use(helmet())
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));

db.sync({ force: false }).then(() => {
  app.listen(3001, () => {
    console.log("listening port: 3001");
  });
});
