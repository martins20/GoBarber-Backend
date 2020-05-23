const { Router } = require("express");

const routes = new Router();

routes.get("/", (req, res) => {
  res.json({ msg: "hello world" });
});

module.exports = routes;
