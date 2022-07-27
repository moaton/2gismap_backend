module.exports = app => {
  const cashRegisterMachine = require("../controllers/legalEntities.controller.js");
  var router = require("express").Router();
  router.post("/", cashRegisterMachine.create);
  router.get("/", cashRegisterMachine.findAll);
  router.get("/:id", cashRegisterMachine.findOne);
  router.put("/:id", cashRegisterMachine.update);
  router.delete("/:id", cashRegisterMachine.delete);
  router.delete("/", cashRegisterMachine.deleteAll);
  app.use('/api/cash-register-machine', router);
};