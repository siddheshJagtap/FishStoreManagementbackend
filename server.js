const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();

app.post("/profile", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.send({ result: "no login" });
    } else {
      res.json({
        message: "Post created...",
        authData,
      });
    }
  });
});

app.post("/api/login", (req, res) => {
  const user = {
    id: req.body.id,
    username: req.body.username,
    email: req.body.email,
  };

  jwt.sign({ user }, "secretkey", { expiresIn: "300s" }, (err, token) => {
    res.json({
      token,
    });
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.send({ result: "no login" });
  }
}

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./application/models");
db.sequelize.sync();

// test
app.get("/", (req, res) => {
  res.json({ message: "Fish Store Management Application" });
});

require("./application/routes/store.routes")(app);

// setting port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
