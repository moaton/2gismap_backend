module.exports = app => {
  const tickets = require("../controllers/tickets.controller.js");
  var router = require("express").Router();
  router.post("/", tickets.create);
  router.get("/", tickets.findAll);
  router.get("/:id", tickets.findOne);
  router.put("/:id", tickets.update);
  router.delete("/:id", tickets.delete);
  router.delete("/", tickets.deleteAll);
  app.use('/api/tickets', router);
};