module.exports = app => {
  const uninhabitedPremiseTwo = require("../controllers/legalEntities.controller.js");
  var router = require("express").Router();
  router.post("/", uninhabitedPremiseTwo.create);
  router.get("/", uninhabitedPremiseTwo.findAll);
  router.get("/:id", uninhabitedPremiseTwo.findOne);
  router.put("/:id", uninhabitedPremiseTwo.update);
  router.delete("/:id", uninhabitedPremiseTwo.delete);
  router.delete("/", uninhabitedPremiseTwo.deleteAll);
  app.use('/api/uninhabited-premise-two', router);
};