module.exports = app => {
  const uninhabitedPremise = require("../controllers/legalEntities.controller.js");
  var router = require("express").Router();
  router.post("/", uninhabitedPremise.create);
  router.get("/", uninhabitedPremise.findAll);
  router.get("/:id", uninhabitedPremise.findOne);
  router.put("/:id", uninhabitedPremise.update);
  router.delete("/:id", uninhabitedPremise.delete);
  router.delete("/", uninhabitedPremise.deleteAll);
  app.use('/api/uninhabited-premise', router);
};