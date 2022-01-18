const express = require("express");
const app = express();

const path = require("path");

const api = require("./src/api");

const morgan = require("morgan");

app.listen("3000", () => {
  console.log("Runing");
});

app.use((req, res, next) => {
  console.log("1");
  next();
  console.log("2");
  next();
});
// Next() chuyen toi middleware tiep theo, middleware nao chay roi se ko chay lai
app.use((req, res, next) => {
  console.log("3");
  next();
  console.log("4");
});

const hello = (req, res, next) => {
  console.log("Hieu V.");
  // Without next(), bellow middlewares won't be run
  next();
};

app.use(hello);

app.use(express.json());

app.use(morgan("combined"));

// Cac middleware sau nay se ko co next nen chi 1 trong cac truong hop dc chay
app.use("/api/v1", api);

app.use(
  "/api/v2",
  (req, res, next) => {
    req.hieuvMsg = "Api v2 is developing";
    next();
  },
  (req, res, next) => {
    console.log(req.hieuvMsg);
    next();
  }
);

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "/package.json"));
});

      app.use((error, req, res, next) => {});
